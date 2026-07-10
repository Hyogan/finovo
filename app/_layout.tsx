import { StatusBar } from "react-native";
import "../global.css"; // <-- file from previous step

import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
// import "../global.css";

export default function RootLayout() {
  const shouldRedirect = true;

  //  <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
      </Stack>
      <StatusBar barStyle="default" />
    </SafeAreaView>

    // {/* </ThemeProvider> */}
  );
}
