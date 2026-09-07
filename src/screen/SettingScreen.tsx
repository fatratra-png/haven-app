import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";
import { colors } from "../theme/color";
import { ChevronLeft } from "lucide-react-native";
import { SettingsRowLink, SettingsRowToggle } from "../components/SettingsRow";
import { SOUNDS, getSelectedSound } from "../sounds/sounds";

export default function SettingsScreen({ navigation }: any) {
  const [darkMode, setDarkMode] = useState(true);
  const [reminders, setReminders] = useState(false);
  const [soundLabel, setSoundLabel] = useState(
    SOUNDS.find((sound) => sound.key === getSelectedSound())?.label ?? "vent"
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setSoundLabel(
        SOUNDS.find((sound) => sound.key === getSelectedSound())?.label ??
          "vent"
      );
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.header} onPress={() => navigation.goBack()}>
        <ChevronLeft size={20} color={colors.ink} />
        <Text style={styles.headerText}>préférences</Text>
      </Pressable>

      <ScrollView>
        <SettingsRowLink label="durée" value="10 min" onPress={() => {}} />
        <SettingsRowLink
          label="son"
          value={soundLabel}
          onPress={() => navigation.navigate("SoundSelect")}
        />
        <SettingsRowToggle
          label="mode sombre"
          value={darkMode}
          onValueChange={setDarkMode}
        />
        <SettingsRowToggle
          label="rappels"
          value={reminders}
          onValueChange={setReminders}
        />

        <View style={styles.about}>
          <Text style={styles.aboutTitle}>à propos</Text>
          <Text style={styles.aboutText}>
            open-source, sans traceurs, version 2026.1
          </Text>
          <Text style={styles.link}>lire notre manifeste</Text>
          <Text style={styles.link}>crédits</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerText: { fontSize: 18, fontWeight: "600", color: colors.ink },
  about: { paddingHorizontal: 24, paddingTop: 32, gap: 8 },
  aboutTitle: { fontSize: 13, fontWeight: "600", color: colors.ink },
  aboutText: { fontSize: 12, color: colors.inkMuted },
  link: { fontSize: 12, color: colors.slate, marginTop: 4 },
});
