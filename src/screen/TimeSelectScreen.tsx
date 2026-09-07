import { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { ChevronLeft, Check } from "lucide-react-native";
import { colors } from "../theme/color";
import EyebrowLabel from "../components/EyebrowLabel";
import PrimaryButton from "../components/PrimaryButton";

const durations = [5, 10, 15, 20];

export default function TimerSelectScreen({ navigation, route }: any) {
  const [selected, setSelected] = useState(10);
  const activity = route?.params?.activity ?? "respirer";

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.back} onPress={() => navigation.goBack()}>
        <ChevronLeft size={20} color={colors.ink} />
        <Text style={styles.backText}>retour</Text>
      </Pressable>

      <View style={styles.titleBlock}>
        <EyebrowLabel>sélection</EyebrowLabel>
        <Text style={styles.title}>{activity}</Text>
        <Text style={styles.subtitle}>combien de temps ?</Text>
      </View>

      <View style={styles.grid}>
        {durations.map((min) => {
          const active = selected === min;
          return (
            <Pressable
              key={min}
              style={({ pressed }) => [
                styles.card,
                active && styles.cardActive,
                pressed && styles.pressed,
              ]}
              onPress={() => setSelected(min)}
            >
              <Text style={[styles.number, active && styles.numberActive]}>
                {min}
              </Text>
              <Text style={[styles.unit, active && styles.unitActive]}>min</Text>
              {active && (
                <View style={styles.check}>
                  <Check size={13} color={colors.white} strokeWidth={3} />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          label="commencer"
          onPress={() =>
            navigation.navigate("ActiveSession", {
              activity,
              minutes: selected,
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  back: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  backText: { fontSize: 13, color: colors.ink },
  titleBlock: { paddingHorizontal: 24, marginTop: 24, gap: 6 },
  title: { fontSize: 20, fontWeight: "600", color: colors.ink },
  subtitle: { fontSize: 12, color: colors.inkMuted },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingHorizontal: 24,
    marginTop: 36,
  },
  card: {
    width: "47%",
    flexGrow: 1,
    backgroundColor: "#f5f5f3",
    borderRadius: 18,
    paddingVertical: 28,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  cardActive: { backgroundColor: colors.slate },
  pressed: { opacity: 0.7 },
  number: { fontSize: 34, fontWeight: "300", color: colors.ink },
  numberActive: { color: colors.white, fontWeight: "600" },
  unit: { fontSize: 12, color: colors.inkMuted, marginTop: 4 },
  unitActive: { color: "rgba(255,255,255,0.7)" },
  check: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: { paddingHorizontal: 24, paddingBottom: 24, marginTop: "auto" },
});