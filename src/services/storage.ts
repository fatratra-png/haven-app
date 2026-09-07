import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_ID_KEY = "haven_user_id";

export async function getStoredUserId(): Promise<string | null> {
  return AsyncStorage.getItem(USER_ID_KEY);
}

export async function storeUserId(id: string): Promise<void> {
  await AsyncStorage.setItem(USER_ID_KEY, id);
}
