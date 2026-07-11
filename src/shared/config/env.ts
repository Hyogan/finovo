import Constants from "expo-constants";

const apiUrl = Constants.expoConfig?.extra?.apiUrl;

if (!apiUrl) {
  throw new Error("API_URL is not defined. Check your .env file.");
}

export const ENV = {
  API_URL: apiUrl as string,
};
