import { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { Settings, Wind, Headphones, PenLine, Moon, Smile, BookOpen } from "lucide-react-native";
import { colors } from "../theme/color";
import EyebrowLabel from "../components/EyebrowLabel";
import ListRow from "../components/ListRow";
import { getTodayQuote, type Quote } from "../services/quoteService";

const activities = [
  { key: "respirer", title: "respirer", subtitle: "5-20 min", icon: Wind },
  { key: "ecouter", title: "écouter", subtitle: "libre", icon: Headphones },
  { key: "ecrire", title: "écrire", subtitle: "sans limite", icon: PenLine },
  { key: "rien", title: "ne rien faire", subtitle: "1-10 min", icon: Moon },
];

export default function HomeScreen({ navigation }: any) {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    getTodayQuote()
      .then(setQuote)
      .catch(() => {});
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>haven</Text>
        <Pressable
          onPress={() => navigation.navigate("Settings")}
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          hitSlop={12}
        >
          <Settings size={20} color={colors.ink} />
        </Pressable>
      </View>

      {quote ? (
        <View style={styles.quoteBlock}>
          <Text style={styles.quoteText}>"{quote.text}"</Text>
          <Text style={styles.quoteAuthor}>— {quote.author}</Text>
        </View>
      ) : null}

      <View style={styles.eyebrowBlock}>
        <EyebrowLabel>fin de journée</EyebrowLabel>
        <Text style={styles.subtitle}>choisir une transition</Text>
      </View>

      <View style={styles.list}>
        {activities.map((activity) => (
          <ListRow
            key={activity.key}
            title={activity.title}
            subtitle={activity.subtitle}
            icon={<activity.icon size={18} color={colors.inkMuted} />}
            onPress={() =>
              navigation.navigate("TimerSelect", { activity: activity.title })
            }
          />
        ))}
        <ListRow
          title="humeur"
          subtitle="noter comment vous vous sentez"
          icon={<Smile size={18} color={colors.inkMuted} />}
          onPress={() => navigation.navigate("MoodLog")}
        />
        <ListRow
          title="journal"
          subtitle="écrire librement"
          icon={<BookOpen size={18} color={colors.inkMuted} />}
          onPress={() => navigation.navigate("Journal")}
        />
      </View>

      <Text style={styles.footnote}>doux, lent, présent.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  logo: { fontSize: 18, fontWeight: "600", color: colors.ink },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f1ef",
  },
  pressed: { opacity: 0.6 },
  quoteBlock: {
    paddingHorizontal: 24,
    marginTop: 24,
    gap: 6,
  },
  quoteText: {
    fontSize: 14,
    fontStyle: "italic",
    color: colors.ink,
    lineHeight: 22,
  },
  quoteAuthor: {
    fontSize: 12,
    color: colors.inkMuted,
  },
  eyebrowBlock: { paddingHorizontal: 24, marginTop: 24, gap: 6 },
  subtitle: { fontSize: 20, fontWeight: "600", color: colors.ink },
  list: { marginTop: 24 },
  footnote: {
    textAlign: "center",
    fontSize: 11,
    color: colors.inkMuted,
    paddingBottom: 20,
    letterSpacing: 0.4,
  },
});