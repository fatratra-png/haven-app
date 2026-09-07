import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";
import { ChevronLeft, Check } from "lucide-react-native";
import { colors } from "../theme/color";
import EyebrowLabel from "../components/EyebrowLabel";
import { SOUNDS, getSelectedSound, setSelectedSound } from "../sounds/sounds";

export default function SoundSelectScreen({ navigation }: any) {
  const [selected, setSelected] = useState(getSelectedSound());

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.back} onPress={() => navigation.goBack()}>
        <ChevronLeft size={20} color={colors.ink} />
        <Text style={styles.backText}>retour</Text>
      </Pressable>

      <View style={styles.titleBlock}>
        <EyebrowLabel>son ambiant</EyebrowLabel>
        <Text style={styles.title}>choisir un son</Text>
        <Text style={styles.subtitle}>
          le son démarre au début de votre séance.
        </Text>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {SOUNDS.map((sound) => {
          const isSelected = selected === sound.key;
          return (
            <Pressable
              key={sound.key}
              style={[styles.row, isSelected && styles.rowSelected]}
              onPress={() => {
                setSelected(sound.key);
                setSelectedSound(sound.key);
              }}
            >
              <Text style={[styles.label, isSelected && styles.textLight]}>
                {sound.label}
              </Text>
              {isSelected && (
                <Check size={16} color={colors.white} strokeWidth={2.5} />
              )}
            </Pressable>
          );
        })}
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
  titleBlock: { paddingHorizontal: 24, marginTop: 20, gap: 6 },
  title: { fontSize: 20, fontWeight: "600", color: colors.ink },
  subtitle: { fontSize: 12, color: colors.inkMuted },
  list: { marginTop: 24, flex: 1 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  rowSelected: {
    backgroundColor: colors.slate,
    borderBottomColor: colors.slate,
  },
  label: { fontSize: 15, color: colors.ink },
  textLight: { color: colors.white, fontWeight: "500" },
});