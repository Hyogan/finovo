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

export function GroupPreviewCard({
  id,
  name,
  memberCount,
  balance,
  currency,
}: Props) {
  const isSettled = balance === 0;
  const isPositive = balance > 0;

  return (
    <Pressable
      onPress={() => router.push(`/groups/${id}`)}
      className="w-44 bg-surface rounded-2xl border border-border-subtle p-4 mr-3"
    >
      <Text className="text-foreground font-bold text-base" numberOfLines={1}>
        {name}
      </Text>
      <Text className="text-foreground-secondary text-xs mt-1">
        {memberCount} members
      </Text>

      <View className="mt-4">
        <Text
          className={`text-lg font-black ${
            isSettled
              ? "text-foreground-secondary"
              : isPositive
                ? "text-success"
                : "text-danger"
          }`}
        >
          {isSettled
            ? "Settled"
            : `${isPositive ? "+" : "-"}${Math.abs(balance).toLocaleString()}`}
        </Text>
        {!isSettled && (
          <Text className="text-foreground-secondary text-[11px]">
            {currency}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
