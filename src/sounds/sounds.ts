import {
  createAudioPlayer,
  setAudioModeAsync,
  type AudioPlayer,
} from "expo-audio";

export type SoundKey =
  | "campfire"
  | "forest"
  | "keyboard"
  | "lofi"
  | "noise"
  | "ocean"
  | "rain"
  | "stream"
  | "thunder"
  | "water"
  | "waves"
  | "wind";

export type SoundItem = { key: SoundKey; label: string; source: number };

export const SOUNDS: SoundItem[] = [
  { key: "ocean", label: "océan", source: require("../../assets/sounds/sound-ocean.mp3") },
  { key: "forest", label: "forêt", source: require("../../assets/sounds/sound-forest.mp3") },
  { key: "lofi", label: "lofi", source: require("../../assets/sounds/sound-lofi.mp3") },
  { key: "waves", label: "vagues", source: require("../../assets/sounds/sound-waves.mp3") },
  { key: "thunder", label: "orage", source: require("../../assets/sounds/sound-thunder.mp3") },
  { key: "campfire", label: "feu de camp", source: require("../../assets/sounds/sound-campfire.mp3") },
  { key: "stream", label: "ruisseau", source: require("../../assets/sounds/sound-stream.mp3") },
  { key: "keyboard", label: "clavier", source: require("../../assets/sounds/sound-keyboard.mp3") },
  { key: "rain", label: "pluie", source: require("../../assets/sounds/sound-rain.mp3") },
  { key: "wind", label: "vent", source: require("../../assets/sounds/sound-wind.mp3") },
  { key: "noise", label: "bruit blanc", source: require("../../assets/sounds/sound-noise.mp3") },
  { key: "water", label: "eau", source: require("../../assets/sounds/sound-water.mp3") },
];

const SOUND_BY_KEY = Object.fromEntries(
  SOUNDS.map((sound) => [sound.key, sound])
) as Record<SoundKey, SoundItem>;

export function getSoundLabel(key: SoundKey): string {
  return SOUND_BY_KEY[key].label;
}

let selectedKey: SoundKey = "wind";

export function getSelectedSound(): SoundKey {
  return selectedKey;
}

export function setSelectedSound(key: SoundKey) {
  selectedKey = key;
}

let player: AudioPlayer | null = null;
let activeKey: SoundKey | null = null;

export function currentSoundKey(): SoundKey | null {
  return activeKey;
}

async function destroyCurrentPlayer() {
  if (!player) return;
  try {
    player.stop();
    player.remove();
  } catch {}
  player = null;
  activeKey = null;
}

export async function playBackground(key?: SoundKey) {
  const sound = SOUND_BY_KEY[key ?? getSelectedSound()];
  if (activeKey === sound.key && player) return;
  await destroyCurrentPlayer();
  activeKey = sound.key;
  player = createAudioPlayer(sound.source);
  player.loop = true;
  player.play();
}

export async function shuffleBackground(): Promise<SoundKey> {
  const others = SOUNDS.filter((sound) => sound.key !== activeKey);
  const picked = others[Math.floor(Math.random() * others.length)];
  await playBackground(picked.key);
  return picked.key;
}

export async function stopBackground() {
  await destroyCurrentPlayer();
}

export function setBackgroundMuted(muted: boolean) {
  if (!player) return;
  if (muted) player.pause();
  else player.play();
}

setAudioModeAsync({ playsInSilentMode: true });