import * as SecureStore from "expo-secure-store";

const TOKEN_ACCESS_KEY = "x-finovo-access-token-key";
const TOKEN_REFRESH_KEY = "x-finovo-refresh-token-key";

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
export const getAccessToken = async () => {
  const token = await SecureStore.getItemAsync(TOKEN_ACCESS_KEY);
  return token || null;
};

export const getRefreshToken = async () => {
  const token = await SecureStore.getItemAsync(TOKEN_REFRESH_KEY);
  return token || null;
};

export const setTokens = async (tokens: TokenPair) => {
  if (!tokens.accessToken || !tokens.refreshToken) {
    throw new Error("Tokens must not be empty");
  }

  await Promise.all([
    SecureStore.setItemAsync(TOKEN_ACCESS_KEY, tokens.accessToken),
    SecureStore.setItemAsync(TOKEN_REFRESH_KEY, tokens.refreshToken),
  ]);
};

export const clearTokens = async () => {
  await Promise.all([
    SecureStore.deleteItemAsync(TOKEN_ACCESS_KEY),
    SecureStore.deleteItemAsync(TOKEN_REFRESH_KEY),
  ]);
};
