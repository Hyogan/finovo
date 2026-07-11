import { useThemeColors } from "@/shared/hooks/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

export function QuickActionButton({ icon, label, onPress }: Props) {
  const colors = useThemeColors();

  return (
    <Pressable onPress={onPress} className="items-center flex-1">
      <View className="w-12 h-12 rounded-2xl bg-ghost-surface border border-ghost-border items-center justify-center">
        <Ionicons name={icon} size={20} color={colors.primary} />
      </View>
      <Text className="text-foreground-secondary text-xs font-semibold mt-1.5">
        {label}
      </Text>
    </Pressable>
  );
}
