import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Shuffle, Volume2, VolumeX } from "lucide-react-native";
import { colors } from "../theme/color";
import EyebrowLabel from "../components/EyebrowLabel";
import PrimaryButton from "../components/PrimaryButton";
import {
  playBackground,
  stopBackground,
  shuffleBackground,
  setBackgroundMuted,
  getSelectedSound,
  getSoundLabel,
} from "../sounds/sounds";

const RING_SIZE = 280;
const RING_RADIUS = 134;
const RING_STROKE = 3;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function ActiveSessionScreen({ navigation, route }: any) {
  const activity: string = route?.params?.activity ?? "respirer";
  const minutes: number = route?.params?.minutes ?? 10;
  const total = Math.max(1, Math.round(minutes * 60));

  const [remaining, setRemaining] = useState(total);
  const [running, setRunning] = useState(true);
  const [muted, setMuted] = useState(false);
  const [soundLabel, setSoundLabel] = useState(() =>
    getSoundLabel(getSelectedSound())
  );

  useEffect(() => {
    playBackground();
    return () => { stopBackground(); };
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setRemaining((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (remaining === 0) {
      stopBackground();
      navigation.replace("SessionComplete", { activity, minutes });
    }
  }, [remaining, activity, minutes, navigation]);

  const togglePause = () => setRunning((prev) => !prev);

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    setBackgroundMuted(next);
  };

  const onShuffle = async () => {
    const key = await shuffleBackground();
    setSoundLabel(getSoundLabel(key));
    if (muted) setBackgroundMuted(true);
  };

  const progress = total > 0 ? remaining / total : 0;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <EyebrowLabel>en cours</EyebrowLabel>
        <Text style={styles.activity}>{activity}</Text>
      </View>

      <View style={styles.center}>
        <Pressable onPress={togglePause} style={styles.ringWrapper}>
          <Svg
            width={RING_SIZE}
            height={RING_SIZE}
            viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
            style={styles.ring}
          >
            <Circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={RING_STROKE}
              fill="none"
            />
            <Circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              stroke="rgba(255,255,255,0.9)"
              strokeWidth={RING_STROKE}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
            />
          </Svg>
          <View style={styles.timerBlock}>
            <Text style={styles.timer}>{formatTime(remaining)}</Text>
            <Text style={styles.hint}>
              {running ? (total <= 120 ? "inspirez, expirez" : "détendez-vous") : "en pause"}
            </Text>
          </View>
        </Pressable>

        <View style={styles.soundRow}>
          <View style={styles.soundLabelRow}>
            <Volume2 size={13} color="rgba(255,255,255,0.7)" />
            <Text style={styles.soundLabel}>{soundLabel}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.controls}>
          <Pressable
            onPress={toggleSound}
            style={({ pressed }) => [styles.control, pressed && styles.pressed]}
            hitSlop={8}
          >
            {muted ? (
              <VolumeX size={20} color="rgba(255,255,255,0.85)" />
            ) : (
              <Volume2 size={20} color="rgba(255,255,255,0.85)" />
            )}
          </Pressable>
          <Pressable
            onPress={onShuffle}
            style={({ pressed }) => [styles.control, pressed && styles.pressed]}
            hitSlop={8}
          >
            <Shuffle size={20} color="rgba(255,255,255,0.85)" />
          </Pressable>
        </View>
        <PrimaryButton
          dark
          label="terminer"
          onPress={() =>
            navigation.replace("SessionComplete", { activity, minutes })
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.slate,
    justifyContent: "space-between",
  },
  header: { alignItems: "center", paddingTop: 20, gap: 8 },
  activity: { fontSize: 15, fontWeight: "600", color: colors.white },
  center: { alignItems: "center" },
  ringWrapper: { alignItems: "center", justifyContent: "center" },
  ring: { transform: [{ rotate: "-90deg" }] },
  timerBlock: {
    position: "absolute",
    alignItems: "center",
    gap: 8,
  },
  timer: {
    fontSize: 52,
    fontVariant: ["tabular-nums"],
    color: colors.white,
    fontWeight: "300",
    letterSpacing: 1,
  },
  hint: {
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  soundRow: { marginTop: 18, alignItems: "center" },
  soundLabelRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  soundLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    textTransform: "capitalize",
  },
  footer: { paddingHorizontal: 24, paddingBottom: 24, gap: 20 },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  control: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: { opacity: 0.6 },
});