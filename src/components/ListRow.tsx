import type { ReactNode } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { colors } from "../theme/color";

export default function ListRow({
  title,
  subtitle,
  icon,
  onPress,
}: {
  title: string;
  subtitle: string;
  icon?: ReactNode;
  onPress?: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.content}>
        {icon ? <View style={styles.icon}>{icon}</View> : null}
        <View>
          <Text style={[styles.title, icon != null && styles.tight]}>
            {title}
          </Text>
          <Text style={[styles.subtitle, icon != null && styles.tight]}>
            {subtitle}
          </Text>
        </View>
      </View>
      <ChevronRight size={16} color={colors.inkMuted} />
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
  pressed: { opacity: 0.5 },
  content: { flexDirection: "row", alignItems: "center", gap: 16 },
  icon: { width: 20, alignItems: "center" },
  title: { fontSize: 15, fontWeight: "600", color: colors.ink },
  subtitle: { fontSize: 12, color: colors.inkMuted, marginTop: 2 },
  tight: { marginTop: 0 },
});