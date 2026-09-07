import { api } from "./api";

export interface JournalEntry {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
}

export function addJournalEntry(userId: string, content: string) {
  return api.post<JournalEntry>("/api/journals", { userId, content });
}

export function getJournalByDate(userId: string, date: string) {
  return api.get<JournalEntry[]>(`/api/journals?userId=${userId}&date=${date}`);
}
