import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { colors } from "../theme/color";
import EyebrowLabel from "../components/EyebrowLabel";
import PrimaryButton from "../components/PrimaryButton";
import {
  addJournalEntry,
  getJournalByDate,
  type JournalEntry,
} from "../services/journalService";
import { getStoredUserId } from "../services/storage";

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function JournalScreen({ navigation }: any) {
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    loadEntries();
  }, []);

  async function loadEntries() {
    try {
      const userId = await getStoredUserId();
      if (userId) {
        const data = await getJournalByDate(userId, todayKey());
        setEntries(data);
      }
    } catch {}
  }

  async function handleSave() {
    if (!content.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const userId = await getStoredUserId();
      if (!userId) throw new Error("no user");
      await addJournalEntry(userId, content.trim());
      setContent("");
      await loadEntries();
    } catch {
      setError("impossible d'enregistrer.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.back} onPress={() => navigation.goBack()}>
        <ChevronLeft size={20} color={colors.ink} />
        <Text style={styles.backText}>retour</Text>
      </Pressable>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.titleBlock}>
          <EyebrowLabel>journal</EyebrowLabel>
          <Text style={styles.title}>écrivez librement</Text>
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="que ressentez-vous ?"
          placeholderTextColor={colors.inkMuted}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <PrimaryButton
          label={submitting ? "..." : "enregistrer"}
          onPress={handleSave}
        />

        {entries.length > 0 ? (
          <View style={styles.historyBlock}>
            <EyebrowLabel>aujourd'hui</EyebrowLabel>
            {entries.map((entry) => (
              <View key={entry.id} style={styles.entryCard}>
                <Text style={styles.entryContent}>{entry.content}</Text>
                <Text style={styles.entryTime}>
                  {new Date(entry.timestamp).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  back: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  backText: { fontSize: 13, color: colors.ink },
  scroll: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 24 },
  titleBlock: { gap: 6, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: "600", color: colors.ink },
  textInput: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: colors.ink,
    minHeight: 180,
    marginBottom: 16,
  },
  error: { fontSize: 12, color: colors.slate, marginBottom: 8 },
  historyBlock: { marginTop: 28, gap: 8 },
  entryCard: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    gap: 4,
  },
  entryContent: { fontSize: 14, color: colors.ink, lineHeight: 22 },
  entryTime: { fontSize: 11, color: colors.inkMuted },
});
