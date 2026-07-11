import { useThemeColors } from "@/shared/hooks/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
    NotificationData,
    NotificationItem,
} from "./components/NotificationItem";

const MOCK_NOTIFICATIONS: NotificationData[] = [
  {
    id: "1",
    type: "request",
    title: "New Expense Request",
    message:
      "Marc Ndoume requested 15,000 FCFA for 'Apartment Bonapriso' electricity bills.",
    timeAgo: "2m ago",
    isUnread: true,
  },
  {
    id: "2",
    type: "payment",
    title: "Payment Received",
    message: "Sarah Bella settled their balance of 8,500 FCFA in 'Kribi Trip'.",
    timeAgo: "1h ago",
    isUnread: true,
  },
  {
    id: "3",
    type: "alert",
    title: "Budget Threshold Alert",
    message:
      "The 'Wedding Committee' group layout has surpassed 80% of its target allocation.",
    timeAgo: "1d ago",
    isUnread: false,
  },
];

export default function Notifications() {
  const [notifications, setNotifications] =
    useState<NotificationData[]>(MOCK_NOTIFICATIONS);
  const colors = useThemeColors();
  const handleNotificationPress = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isUnread: false } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  return (
    <View className="flex-1 bg-background px-6">
      {/* Screen Sub-Header */}
      <View className="flex-row justify-between items-center pt-6 pb-4 border-b border-border-subtle mb-4">
        <View className="flex-row items-center space-x-2">
          <Text className="text-xl font-black text-foreground tracking-tight">
            Notifications
          </Text>
          {unreadCount > 0 && (
            <View className="bg-primary/10 px-2 py-0.5 rounded-md">
              <Text className="text-primary font-bold text-xs">
                {unreadCount} new
              </Text>
            </View>
          )}
        </View>

        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllAsRead}>
            <Text className="text-sm font-bold text-primary">
              Mark all as read
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Notifications Stream Container */}
      <ScrollView
        className="flex-1 w-full"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {notifications.length === 0 ? (
          <View className="items-center bg-background-secondary rounded-2xl border border-border-subtle py-12 px-6 mt-4">
            <Ionicons
              name="notifications-off-outline"
              size={32}
              color={colors.muted}
            />
            <Text className="text-foreground-secondary text-sm text-center mt-3 font-medium">
              You're all caught up! No new notifications found.
            </Text>
          </View>
        ) : (
          notifications.map((item) => (
            <NotificationItem
              key={item.id}
              {...item}
              onPress={() => handleNotificationPress(item.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
