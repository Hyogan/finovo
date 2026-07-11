import { useThemeColors } from "@/shared/hooks/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ProfileHeaderProps {
  name: string;
  email: string;
  avatarInitials: string;
  onEditAvatar?: () => void;
}

export function ProfileHeader({
  name,
  email,
  avatarInitials,
  onEditAvatar,
}: ProfileHeaderProps) {
  const colors = useThemeColors();
  return (
    <View className="items-center bg-primary rounded-b-full py-6 border-b border-border-subtle mb-4">
      {/* Avatar Wrapper Container */}
      <View className="relative mb-3">
        <View className="w-24 h-24 rounded-full bg-white/30 border-4 border-background-secondary items-center justify-center">
          <Text className="text-2xl font-black text-primary tracking-tight">
            {avatarInitials}
          </Text>
        </View>
        {onEditAvatar && (
          <TouchableOpacity
            onPress={onEditAvatar}
            className="absolute bottom-0 right-0 bg-inverse-btn p-2 rounded-full shadow-md border border-background"
          >
            <Ionicons
              name="camera-outline"
              size={16}
              color={colors.inverseButtonText}
              className="text-inverse-btn-text"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Profile Info Scale */}
      <Text className="text-xl font-black text-inverse-btn-text tracking-tight">
        {name}
      </Text>
      <Text className="text-sm text-foreground-muted mt-0.5">{email}</Text>
    </View>
  );
}
