import { api } from "./api";

export interface Quote {
  id: string;
  text: string;
  author: string;
  date: string;
}

export function getTodayQuote() {
  return api.get<Quote>("/api/quotes/today");
}
