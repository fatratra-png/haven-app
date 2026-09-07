import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Check } from "lucide-react-native";
import { colors } from "../theme/color";
import { fonts } from "../theme/typography";
import EyebrowLabel from "../components/EyebrowLabel";
import PrimaryButton from "../components/PrimaryButton";
import OutlineButton from "../components/OutlineButton";

export default function SessionCompleteScreen({ navigation, route }: any) {
  const activity: string = route?.params?.activity ?? "respirer";
  const minutes: number = route?.params?.minutes ?? 10;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.seal}>
          <Check size={18} color={colors.slate} strokeWidth={2.5} />
        </View>
        <EyebrowLabel>fin</EyebrowLabel>
        <Text style={styles.title}>c'est tout.</Text>
        <Text style={styles.subtitle}>
          vous pouvez retourner à votre soirée.
        </Text>
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          label="fermer"
          onPress={() => navigation.popToTop()}
        />
        <OutlineButton
          label="encore"
          onPress={() =>
            navigation.replace("ActiveSession", { activity, minutes })
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
    justifyContent: "space-between",
  },
  content: { paddingHorizontal: 24, marginTop: 40, gap: 12 },
  seal: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f1f1ef",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  title: { fontFamily: fonts.serif, fontSize: 28, color: colors.ink },
  subtitle: { fontSize: 13, color: colors.inkMuted },
  footer: { paddingHorizontal: 24, paddingBottom: 24, gap: 12 },
});