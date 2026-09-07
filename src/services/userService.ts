import { api } from "./api";

export type Gender = "MALE" | "FEMALE";

export interface User {
  id: string;
  userName: string;
  age: number;
  gender: Gender;
}

export function createUser(userName: string, age: number, gender: Gender) {
  return api.post<User>("/api/users", { userName, age, gender });
}

export function getUser(id: string) {
  return api.get<User>(`/api/users/${id}`);
}
