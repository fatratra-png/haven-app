import { View, Text, StyleSheet, Pressable, Switch } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { colors } from "../theme/color";

export function SettingsRowLink({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>
        <ChevronRight size={16} color={colors.inkMuted} />
      </View>
    </Pressable>
  );
}

export function SettingsRowToggle({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.line, true: colors.slate }}
        thumbColor={colors.white}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  label: { fontSize: 14, color: colors.ink },
  valueRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  value: { fontSize: 13, color: colors.inkMuted },
});
