import { Pressable, View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/color";

export default function DurationRow({
  minutes,
  selected,
  onPress,
}: {
  minutes: number;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.row, selected && styles.rowSelected]}
      onPress={onPress}
    >
      <View style={styles.valueRow}>
        <Text style={[styles.number, selected && styles.textLight]}>
          {minutes}
        </Text>
        <Text style={[styles.unit, selected && styles.textLightMuted]}>
          min
        </Text>
      </View>
      {selected && <View style={styles.dot} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  rowSelected: {
    backgroundColor: colors.slate,
    borderBottomColor: colors.slate,
  },
  valueRow: { flexDirection: "row", alignItems: "baseline", gap: 6 },
  number: { fontSize: 20, fontWeight: "600", color: colors.ink },
  unit: { fontSize: 12, color: colors.inkMuted },
  textLight: { color: colors.white },
  textLightMuted: { color: "rgba(255,255,255,0.7)" },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.white },
});
