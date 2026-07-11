import { useThemeColors } from "@/shared/hooks/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

export function HeroVisual() {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const colors = useThemeColors();

  useEffect(() => {
    // 1. Smooth Entry Fade
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // 2. Loop Ambient Floating (Up & Down)
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -6,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 6,
          duration: 2500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={{ opacity: fadeAnim, transform: [{ translateY: floatAnim }] }}
      className="items-center justify-center flex-1 my-4 relative"
    >
      {/* Background Ambient Glow */}
      <View className="absolute w-72 h-72 bg-primary/5 blur-3xl rounded-full" />

      {/* Floating Top-Right Icon Box */}
      <View className="absolute top-4 right-6 bg-background-secondary p-3 rounded-2xl shadow-sm border border-border-subtle z-20">
        <Ionicons name="wallet-outline" size={24} color={colors.primary} />
      </View>

      {/* Main Visual Container Card */}
      <View className="w-full -rotate-3 max-w-sm bg-background-secondary border border-border-subtle p-5 rounded-[32px] shadow-xl shadow-black/5 relative">
        <View className="w-full h-44 bg-ghost-surface rounded-2xl overflow-hidden justify-center items-center border border-ghost-border">
          <Ionicons name="people-outline" size={48} color={colors.muted} />
          <Text className="text-xs text-foreground-secondary mt-2 font-medium">
            Shared Balance Overview
          </Text>
        </View>

        <View className="flex-row justify-between items-center mt-4">
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-muted/40 border-2 border-background-secondary" />
            <View className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background-secondary -ml-3" />
            <View className="w-8 h-8 rounded-full bg-muted/60 border-2 border-background-secondary -ml-3" />
          </View>
          <View className="bg-primary/10 px-3 py-1.5 rounded-full">
            <Text className="text-primary font-bold text-xs">
              Balance: $0.00
            </Text>
          </View>
        </View>
      </View>

      {/* Floating Bottom-Left Activity Metric Badge */}
      <View className="absolute bottom-10 left-4 bg-inverse-btn p-3 rounded-2xl shadow-lg z-20">
        <Ionicons
          name="trending-up"
          size={20}
          color={colors.inverseButtonText}
        />
      </View>
    </Animated.View>
  );
}
