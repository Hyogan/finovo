import { Stack } from "expo-router";
// import { StatusBar } from "expo-status-bar";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUniwind } from "uniwind";
import "../global.css";
export default function RootLayout() {
  const { theme } = useUniwind();

  const isDark = theme === "dark";

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? "#000000" : "#ffffff",
      }}
    >
      <StatusBar
        style={isDark ? "light" : "dark"}
        backgroundColor={isDark ? "#000000" : "#ffffff"}
      />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth" />
      </Stack>
    </SafeAreaView>
  );
}
