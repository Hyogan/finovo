import { themeIconColor } from "@shared/theme/colors";
import { useColorScheme } from "react-native";

export function useThemeIconColor() {
  const scheme = useColorScheme();

  return scheme === "dark" ? themeIconColor.dark : themeIconColor.light;
}
