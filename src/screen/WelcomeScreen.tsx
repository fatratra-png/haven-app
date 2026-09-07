import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { colors } from "../theme/color";
import { fonts } from "../theme/typography";
import PrimaryButton from "../components/PrimaryButton";
import { getStoredUserId, storeUserId } from "../services/storage";
import { createUser, getUser } from "../services/userService";

export default function WelcomeScreen({ navigation }: any) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleEnter() {
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const storedId = await getStoredUserId();
      if (storedId) {
        try {
          await getUser(storedId);
          navigation.replace("Home");
          return;
        } catch {
          // stored user no longer valid, create a new one
        }
      }
      const user = await createUser("Fitia", 22, "FEMALE");
      await storeUserId(user.id);
      navigation.replace("Home");
    } catch {
      setError("connexion impossible, réessayez.");
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>haven</Text>
        <View style={styles.headlineBlock}>
          <Text style={styles.headline}>
            fermer les yeux.{"\n"}décompresser.{"\n"}sans distractions.
          </Text>
          <Text style={styles.subtitle}>
            un espace de silence physique et numérique.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton label="entrer dans haven" onPress={handleEnter} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Text style={styles.offline}>hors-ligne</Text>
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
  centered: { justifyContent: "center", alignItems: "center" },
  content: { paddingHorizontal: 24, paddingTop: 40 },
  logo: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.ink,
    marginBottom: 60,
  },
  headlineBlock: { gap: 16 },
  headline: {
    fontFamily: fonts.serif,
    fontSize: 28,
    lineHeight: 38,
    color: colors.ink,
  },
  subtitle: { fontSize: 13, color: colors.inkMuted, lineHeight: 20 },
  footer: { paddingHorizontal: 24, paddingBottom: 24, gap: 16 },
  error: { textAlign: "center", fontSize: 12, color: colors.slate },
  offline: { textAlign: "center", fontSize: 11, color: colors.inkMuted },
});
