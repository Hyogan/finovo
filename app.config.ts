// app.config.ts
import "dotenv/config";
import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "finovo",
  slug: "finovo",
  extra: {
    apiUrl: process.env.API_URL,
  },
});
