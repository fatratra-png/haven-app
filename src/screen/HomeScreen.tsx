import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { colors } from "../theme/color";
import EyebrowLabel from "../components/EyebrowLabel";
import ListRow from "../components/ListRow";

const activities = [
  { key: "respirer", title: "respirer", subtitle: "5-20 min" },
  { key: "ecouter", title: "écouter", subtitle: "libre" },
  { key: "ecrire", title: "écrire", subtitle: "sans limite" },
  { key: "rien", title: "ne rien faire", subtitle: "1-10 min" },
];

export default function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>haven</Text>
        <Pressable onPress={() => navigation.navigate("Settings")}>
          <Text style={styles.gear}>⚙</Text>
        </Pressable>
      </View>

      <View style={styles.eyebrowBlock}>
        <EyebrowLabel>fin de journée</EyebrowLabel>
        <Text style={styles.subtitle}>choisir une transition</Text>
      </View>

      <View style={styles.list}>
        {activities.map((activity) => (
          <ListRow
            key={activity.key}
            title={activity.title}
            subtitle={activity.subtitle}
            onPress={() =>
              navigation.navigate("TimerSelect", { activity: activity.title })
            }
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  logo: { fontSize: 18, fontWeight: "600", color: colors.ink },
  gear: { fontSize: 18, color: colors.ink },
  eyebrowBlock: { paddingHorizontal: 24, marginTop: 32, gap: 6 },
  subtitle: { fontSize: 20, fontWeight: "600", color: colors.ink },
  list: { marginTop: 24 },
});
