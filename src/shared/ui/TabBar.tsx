import { useThemeColors } from "@/shared/hooks/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Pressable, Text, View } from "react-native";

type IconLib = "ionicons" | "mci";

type TabMeta = {
  lib: IconLib;
  active: string;
  inactive: string;
  label: string;
};

const TAB_META: Record<string, TabMeta> = {
  index: {
    lib: "ionicons",
    active: "home",
    inactive: "home-outline",
    label: "Home",
  },
  groups: {
    lib: "mci",
    active: "account-group",
    inactive: "account-group-outline",
    label: "Groups",
  },
  notifications: {
    lib: "ionicons",
    active: "notifications",
    inactive: "notifications-outline",
    label: "Alerts",
  },
  profile: {
    lib: "ionicons",
    active: "person",
    inactive: "person-outline",
    label: "Profile",
  },
};

export default function TabBar({ state, navigation }: BottomTabBarProps) {
  const colors = useThemeColors();

  return (
    <View className="absolute bottom-6 left-6 right-6">
      <View
        className="flex-row items-center bg-white rounded-3xl border border-border-subtle px-3 py-2"
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
        }}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // Center action: raised button, not a standard tab icon/label
          if (route.name === "add-expense") {
            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                className="flex-1 items-center"
              >
                <View
                  className="w-12 h-12 rounded-2xl bg-primary items-center justify-center -mt-8"
                  style={{
                    shadowColor: "#000",
                    shadowOpacity: 0.18,
                    shadowRadius: 8,
                    shadowOffset: { width: 0, height: 3 },
                    elevation: 5,
                  }}
                >
                  <Ionicons name="add" size={26} color="#fff" />
                </View>
              </Pressable>
            );
          }

          const meta = TAB_META[route.name];
          if (!meta) return null;

          const iconColor = isFocused ? colors.primary : colors.muted;
          const iconName = isFocused ? meta.active : meta.inactive;

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              className="flex-1 items-center py-1.5"
            >
              {meta.lib === "ionicons" ? (
                <Ionicons name={iconName as any} size={22} color={iconColor} />
              ) : (
                <MaterialCommunityIcons
                  name={iconName as any}
                  size={22}
                  color={iconColor}
                />
              )}
              <Text
                className={`text-[11px] mt-1 font-semibold ${
                  isFocused ? "text-primary" : "text-muted"
                }`}
              >
                {meta.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
