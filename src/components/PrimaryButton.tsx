import { Pressable, Text, StyleSheet } from "react-native";
import { colors } from "../theme/color";

export default function PrimaryButton({
  label,
  onPress,
  dark = false,
}: {
  label: string;
  onPress: () => void;
  dark?: boolean;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        dark ? styles.buttonDark : styles.buttonLight,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.label, dark && styles.labelDark]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonLight: { backgroundColor: colors.slate },
  buttonDark: { backgroundColor: "rgba(255,255,255,0.12)" },
  pressed: { opacity: 0.6 },
  label: { color: colors.white, fontSize: 14, fontWeight: "600" },
  labelDark: { color: colors.white },
});