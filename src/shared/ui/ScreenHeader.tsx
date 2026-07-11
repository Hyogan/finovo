import { useThemeColors } from "@/shared/hooks/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title: string;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
};

export function ScreenHeader({ title, rightIcon, onRightPress }: Props) {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="bg-background border-b border-border-subtle"
    >
      <View className="flex-row justify-between items-center h-14 px-6">
        <Text className="text-foreground text-lg font-black tracking-tight">
          {title}
        </Text>

        {rightIcon && (
          <Pressable
            onPress={onRightPress}
            className="w-10 h-10 rounded-full bg-ghost-surface border border-ghost-border items-center justify-center"
          >
            <Ionicons name={rightIcon} size={20} color={colors.foreground} />
          </Pressable>
        )}
      </View>
    </View>
  );
}
