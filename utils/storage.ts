import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStorageObject = async (
  key: string
): Promise<Record<string, unknown>> => {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : {};
};

export const setStorageObject = async (
  key: string,
  value: Record<string, unknown>
): Promise<void> => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getStorageValue = async (key: string): Promise<string> => {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue ?? "";
};

export const setStorageValue = async (
  key: string,
  value: string
): Promise<void> => {
  await AsyncStorage.setItem(key, value);
};
