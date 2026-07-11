import { useThemeColors } from "@/shared/hooks/theme";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  id: string;
  name: string;
  memberCount: number;
  balance: number;
  currency: string;
};

export function GroupListItem({
  id,
  name,
  memberCount,
  balance,
  currency,
}: Props) {
  const colors = useThemeColors();
  const isSettled = balance === 0;
  const isPositive = balance > 0;

  const chipBackground = isSettled
    ? colors.ghostSurface
    : isPositive
      ? colors.successBackground
      : colors.dangerBackground;

  const chipTextColor = isSettled
    ? colors.foregroundSecondary
    : isPositive
      ? colors.successForeground
      : colors.dangerForeground;

  return (
    <Pressable
      onPress={() => router.push(`/groups/${id}`)}
      className="flex-row items-center bg-card border border-border-subtle rounded-2xl p-4 mb-3"
    >
      <View className="w-11 h-11 rounded-full bg-primary/15 items-center justify-center mr-3">
        <Text className="text-primary font-black text-base">
          {name.charAt(0).toUpperCase()}
        </Text>
      </View>

      <View className="flex-1 pr-3">
        <Text
          className="text-foreground font-bold text-[15px]"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text className="text-foreground-secondary text-xs mt-0.5">
          {memberCount} members
        </Text>
      </View>

      <View
        style={{ backgroundColor: chipBackground }}
        className="px-2.5 py-1.5 rounded-full"
      >
        <Text style={{ color: chipTextColor }} className="text-xs font-bold">
          {isSettled
            ? "Settled"
            : `${isPositive ? "+" : "-"}${Math.abs(balance).toLocaleString()}`}
        </Text>
      </View>
    </Pressable>
  );
}
