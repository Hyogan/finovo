import { useThemeColors } from "@/shared/hooks/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Logo } from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";

type Props = {
  firstName: string;
  hasUnreadNotifications?: boolean;
};

export function Header({ firstName, hasUnreadNotifications }: Props) {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  return (
    <View className=" border-b border-border-subtle">
      <View className="flex-row justify-between items-center pt-4 px-6">
        <View>
          <View className="flex-row justify-between items-center">
            <Logo size={30} />
            <Text className="text-foreground-secondary text-xs font-semibold">
              Welcome back
            </Text>
          </View>

          <Text className="text-foreground text-lg font-black tracking-tight">
            {firstName}
          </Text>
        </View>

        <View className="flex-row items-center gap-3">
          <ThemeSwitcher variant="menu" size="md" />
          <Pressable
            onPress={() => router.push("/notifications")}
            className="w-10 h-10 rounded-full bg-ghost-surface border border-ghost-border items-center justify-center"
          >
            <Ionicons
              name="notifications-outline"
              size={20}
              color={colors.foreground}
            />
            {hasUnreadNotifications && (
              <View className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger" />
            )}
          </Pressable>

          <Pressable
            onPress={() => router.push("/profile")}
            className="w-10 h-10 rounded-full bg-primary items-center justify-center"
          >
            <Text className="text-white font-bold text-sm">
              {firstName.charAt(0)}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
