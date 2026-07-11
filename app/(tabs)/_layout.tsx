import { useThemeColors } from "@/shared/hooks/theme";
import { Header } from "@/shared/ui/CustomHeader";
import { ScreenHeader } from "@/shared/ui/ScreenHeader";
import TabBar from "@/shared/ui/TabBar";
import { router, Tabs } from "expo-router";
import React from "react";

// TODO: replace with real user session data (auth/user context)
const MOCK_USER = { firstName: "Arsène", hasUnreadNotifications: true };

export default function TabsLayout() {
  const colors = useThemeColors();

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: true,
          header: () => (
            <Header
              firstName={MOCK_USER.firstName}
              hasUnreadNotifications={MOCK_USER.hasUnreadNotifications}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: "Groups",
          headerShown: true,
          header: () => (
            <ScreenHeader
              title="Groups"
              rightIcon="add"
              onRightPress={() => router.push("/groups/create")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add-expense"
        options={{ title: "Add" }}
        listeners={{
          tabPress: (e) => {
            // This tab has no screen of its own — open the add expense
            // flow as a pushed route (modal-style) instead of switching tabs.
            e.preventDefault();
            router.push("/add-expense");
          },
        }}
      />
      <Tabs.Screen name="notifications" options={{ title: "Alerts" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
