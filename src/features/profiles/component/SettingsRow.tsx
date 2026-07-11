import { IoniconName } from "@/shared/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export interface SettingsRowProps {
  iconName: IoniconName;
  label: string;
  valueText?: string;
  onPress: () => void;
  isDestructive?: boolean;
}

export function SettingsRow({
  iconName,
  label,
  valueText,
  onPress,
  isDestructive = false,
}: SettingsRowProps) {
  const textStyle = isDestructive ? "text-red-500" : "text-foreground";
  const iconStyle = isDestructive
    ? "text-red-500"
    : "text-foreground-secondary";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="flex-row items-center justify-between h-14 w-full px-4 bg-background-secondary border border-border-subtle rounded-2xl mb-3"
    >
      <View className="flex-row items-center gap-2">
        <Ionicons name={iconName as any} size={20} className={iconStyle} />
        <Text className={`text-base font-semibold ${textStyle}`}>{label}</Text>
      </View>

      <View className="flex-row items-center space-x-2">
        {valueText && (
          <Text className="text-sm text-muted font-medium">{valueText}</Text>
        )}
        <Ionicons
          name="chevron-forward"
          size={16}
          className={isDestructive ? "text-red-400" : "text-muted"}
        />
      </View>
    </TouchableOpacity>
  );
}
