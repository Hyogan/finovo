import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Animated, Pressable, Text } from "react-native";

interface ButtonProps {
  label: string;
  variant: "primary" | "secondary";
  iconRight?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  onPress?: () => void;
}

export function Button({
  label,
  variant,
  iconRight,
  onPress,
  disabled = false,
}: ButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled) return;
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled) return;
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const isPrimary = variant === "primary";

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      onPress={onPress}
    >
      <Animated.View
        style={{ transform: [{ scale: scaleAnim }] }}
        className={`w-full py-4 rounded-2xl flex-row justify-center items-center ${
          isPrimary
            ? "bg-inverse-btn shadow-lg shadow-black/5"
            : "bg-background-secondary border border-border"
        }`}
      >
        <Text
          className={`font-bold text-base ${isPrimary ? "text-inverse-btn-text mr-2" : "text-foreground"}`}
        >
          {label}
        </Text>
        {isPrimary && iconRight && (
          <Ionicons
            name={iconRight}
            size={18}
            className="text-inverse-btn-text"
          />
        )}
      </Animated.View>
    </Pressable>
  );
}
