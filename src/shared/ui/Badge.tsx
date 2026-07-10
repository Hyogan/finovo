import React from "react";
import { Text, View } from "react-native";

interface BadgeProps {
  label: string;
}

export function Badge({ label }: BadgeProps) {
  return (
    <View className="bg-primary/10 px-3 py-1.5 rounded-full">
      <Text className="text-primary font-bold text-xs">{label}</Text>
    </View>
  );
}
