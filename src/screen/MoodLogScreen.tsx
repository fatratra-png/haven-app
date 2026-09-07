import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { colors } from "../theme/color";
import EyebrowLabel from "../components/EyebrowLabel";
import PrimaryButton from "../components/PrimaryButton";
import {
  recordMood,
  getMoodsByDate,
  type Mood,
  type MoodEntry,
} from "../services/moodService";
import { getStoredUserId } from "../services/storage";

const MOODS: { key: Mood; label: string }[] = [
  { key: "CALM", label: "calme" },
  { key: "HAPPY", label: "heureux·se" },
  { key: "PEACEFUL", label: "paisible" },
  { key: "NEUTRAL", label: "neutre" },
  { key: "TIRED", label: "fatigué·e" },
  { key: "ANXIOUS", label: "anxieux·se" },
  { key: "STRESSED", label: "stressé·e" },
  { key: "SAD", label: "triste" },
];

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function MoodLogScreen({ navigation }: any) {
  const [selected, setSelected] = useState<Mood | null>(null);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [todayMoods, setTodayMoods] = useState<MoodEntry[]>([]);

  useEffect(() => {
    loadTodayMoods();
  }, []);

  async function loadTodayMoods() {
    try {
      const userId = await getStoredUserId();
      if (userId) {
        const entries = await getMoodsByDate(userId, todayKey());
        setTodayMoods(entries);
      }
    } catch {}
  }

  async function handleSave() {
    if (!selected || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const userId = await getStoredUserId();
      if (!userId) throw new Error("no user");
      await recordMood(userId, selected, note.trim() || undefined);
      await loadTodayMoods();
      setSelected(null);
      setNote("");
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
          <EyebrowLabel>humeur</EyebrowLabel>
          <Text style={styles.title}>comment vous sentez-vous ?</Text>
        </View>

        <View style={styles.moodGrid}>
          {MOODS.map((m) => (
            <Pressable
              key={m.key}
              style={[
                styles.moodChip,
                selected === m.key && styles.moodChipActive,
              ]}
              onPress={() => setSelected(m.key)}
            >
              <Text
                style={[
                  styles.moodLabel,
                  selected === m.key && styles.moodLabelActive,
                ]}
              >
                {m.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {selected ? (
          <View style={styles.noteBlock}>
            <TextInput
              style={styles.noteInput}
              placeholder="une note ? (optionnel)"
              placeholderTextColor={colors.inkMuted}
              value={note}
              onChangeText={setNote}
              multiline
              maxLength={280}
            />
          </View>
        ) : null}

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <PrimaryButton
          label={submitting ? "..." : "enregistrer"}
          onPress={handleSave}
        />

        {todayMoods.length > 0 ? (
          <View style={styles.historyBlock}>
            <EyebrowLabel>aujourd'hui</EyebrowLabel>
            {todayMoods.map((entry) => (
              <View key={entry.id} style={styles.historyRow}>
                <Text style={styles.historyMood}>{entry.mood.toLowerCase()}</Text>
                {entry.note ? (
                  <Text style={styles.historyNote}>{entry.note}</Text>
                ) : null}
                <Text style={styles.historyTime}>
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
  moodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  moodChip: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#f5f5f3",
    borderWidth: 1,
    borderColor: colors.line,
  },
  moodChipActive: {
    backgroundColor: colors.slate,
    borderColor: colors.slate,
  },
  moodLabel: { fontSize: 14, color: colors.ink },
  moodLabelActive: { color: colors.white, fontWeight: "500" },
  noteBlock: { marginBottom: 16 },
  noteInput: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: colors.ink,
    minHeight: 60,
    textAlignVertical: "top",
  },
  error: { fontSize: 12, color: colors.slate, marginBottom: 8 },
  historyBlock: { marginTop: 28, gap: 8 },
  historyRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    gap: 2,
  },
  historyMood: { fontSize: 14, fontWeight: "600", color: colors.ink },
  historyNote: { fontSize: 13, color: colors.inkMuted },
  historyTime: { fontSize: 11, color: colors.inkMuted },
});
