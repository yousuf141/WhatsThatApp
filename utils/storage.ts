import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStorageObject = async (
  key: string
): Promise<Record<string, unknown>> => {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : {};
};

export const getStorageValue = async (key: string): Promise<string> => {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue ?? "";
};
