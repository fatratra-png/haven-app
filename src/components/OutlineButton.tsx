import { Pressable, Text, StyleSheet } from "react-native";
import { colors } from "../theme/color";

export default function OutlineButton({
  label,
  onPress,
  light = false,
}: {
  label: string;
  onPress: () => void;
  light?: boolean;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        light ? styles.buttonLight : styles.buttonDark,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonDark: { borderColor: colors.slate },
  buttonLight: { borderColor: "rgba(255,255,255,0.5)" },
  pressed: { opacity: 0.6 },
  label: { fontSize: 14, fontWeight: "600", color: colors.slate },
});