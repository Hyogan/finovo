import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export interface NotificationData {
  id: string;
  type: "request" | "payment" | "alert";
  title: string;
  message: string;
  timeAgo: string;
  isUnread: boolean;
}

interface NotificationItemProps extends NotificationData {
  onPress: () => void;
}

export function NotificationItem({
  type,
  title,
  message,
  timeAgo,
  isUnread,
  onPress,
}: NotificationItemProps) {
  // Map notification types to system styles
  const typeConfigs = {
    request: {
      icon: "wallet-outline",
      bg: "bg-primary/10",
      color: "text-primary",
    },
    payment: {
      icon: "checkmark-circle-outline",
      bg: "bg-emerald-500/10",
      color: "text-emerald-500",
    },
    alert: {
      icon: "notifications-outline",
      bg: "bg-amber-500/10",
      color: "text-amber-500",
    },
  };

  const currentConfig = typeConfigs[type] || typeConfigs.alert;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`flex-row p-4 rounded-2xl border mb-3 items-start transition-all ${
        isUnread
          ? "bg-background-secondary border-primary/20 shadow-sm"
          : "bg-background-secondary/60 border-border-subtle"
      }`}
    >
      {/* Dynamic Action Icon Badge */}
      <View
        className={`w-10 h-10 ${currentConfig.bg} rounded-xl items-center justify-center mr-3 mt-0.5`}
      >
        <Ionicons
          name={currentConfig.icon as any}
          size={20}
          className={currentConfig.color}
        />
      </View>

      {/* Copy Stack */}
      <View className="flex-1 pr-2">
        <View className="flex-row justify-between items-baseline mb-1">
          <Text
            className={`text-sm tracking-tight flex-1 mr-2 ${isUnread ? "font-bold text-foreground" : "font-semibold text-foreground-secondary"}`}
          >
            {title}
          </Text>
          <Text className="text-xs text-muted font-medium">{timeAgo}</Text>
        </View>
        <Text
          className="text-xs text-foreground-secondary leading-4"
          numberOfLines={2}
        >
          {message}
        </Text>
      </View>

      {/* Inline Unread Unconditional Indicator Dot */}
      {isUnread && (
        <View className="w-2 h-2 rounded-full bg-primary self-center ml-1" />
      )}
    </TouchableOpacity>
  );
}
