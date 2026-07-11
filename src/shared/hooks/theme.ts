import { themeColors } from "@shared/theme/colors";
import { useColorScheme } from "react-native";

export function useThemeColors() {
  const scheme = useColorScheme();

  return scheme === "dark" ? themeColors.dark : themeColors.light;
}
