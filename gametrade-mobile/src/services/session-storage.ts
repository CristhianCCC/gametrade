import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const ACCESS_TOKEN_KEY = "gametrade.access-token";

function getWebStorage() {
  if (typeof globalThis === "undefined" || !("localStorage" in globalThis)) {
    return undefined;
  }

  return globalThis.localStorage;
}

export const sessionStorage = {
  async getToken() {
    if (Platform.OS === "web") {
      return getWebStorage()?.getItem(ACCESS_TOKEN_KEY) ?? null;
    }

    return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  },

  async saveToken(token: string) {
    if (Platform.OS === "web") {
      getWebStorage()?.setItem(ACCESS_TOKEN_KEY, token);
      return;
    }

    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
  },

  async clearToken() {
    if (Platform.OS === "web") {
      getWebStorage()?.removeItem(ACCESS_TOKEN_KEY);
      return;
    }

    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  },
};
