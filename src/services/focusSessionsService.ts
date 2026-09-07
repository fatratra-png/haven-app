import { api } from "./api";

export interface FocusSession {
  id: string;
  userId: string;
  durationSeconds: number;
  startedAt: string;
  completed: boolean;
}

export function startFocusSession(userId: string, durationSeconds: number) {
  return api.post<FocusSession>("/api/focus-sessions", {
    userId,
    duration: `PT${Math.floor(durationSeconds / 60)}M`, // format ISO-8601 attendu par Jackson
  });
}

export function completeFocusSession(id: string, userId: string) {
  return api.patch<void>(`/api/focus-sessions/${id}/complete`, { userId });
}
