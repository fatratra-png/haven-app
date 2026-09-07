import { api } from "./api";

export type Mood =
  | "CALM"
  | "HAPPY"
  | "TIRED"
  | "ANXIOUS"
  | "STRESSED"
  | "SAD"
  | "PEACEFUL"
  | "NEUTRAL";

export interface MoodEntry {
  id: string;
  userId: string;
  mood: Mood;
  note: string | null;
  timestamp: string;
}

export function recordMood(userId: string, mood: Mood, note?: string) {
  return api.post<MoodEntry>("/api/moods", { userId, mood, note });
}

export function getMoodsByDate(userId: string, date: string) {
  return api.get<MoodEntry[]>(`/api/moods?userId=${userId}&date=${date}`);
}
