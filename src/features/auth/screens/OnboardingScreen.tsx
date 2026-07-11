import { Button } from "@/shared/components/Button";
import { useThemeColors } from "@/shared/hooks/theme";
import { Logo } from "@/shared/ui/Logo";
import ThemeSwitcher from "@/shared/ui/ThemeSwitcher";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { HeroVisual } from "../components/HeroVisuals";

export default function Onboarding() {
  const contentFade = useRef(new Animated.Value(0)).current;
  const contentSlide = useRef(new Animated.Value(15)).current;
  const colors = useThemeColors();
  const goToLogin = () => {
    router.navigate("/(tabs)/");
  };

  const goToRegister = () => {
    router.navigate("/auth/register");
  };
  useEffect(() => {
    // Delayed stagger transition for content and copy elements
    Animated.parallel([
      Animated.timing(contentFade, {
        toValue: 1,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(contentSlide, {
        toValue: 0,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View className="flex-1 justify-between bg-background px-6 py-6">
      {/* Navbar */}
      <View
        style={{ zIndex: 50, elevation: 50 }}
        className="flex-row justify-between items-center h-14 border-b border-border-subtle"
      >
        <Logo variant="horizontal" size={40} />
        {/* <IconButton iconName="help-circle-outline" onPress={() => {}} /> */}
        <ThemeSwitcher variant="menu" />
      </View>

      {/* Hero Presentation */}
      <HeroVisual />

      {/* Content & Value Proposition */}
      <Animated.View
        style={{
          opacity: contentFade,
          transform: [{ translateY: contentSlide }],
        }}
        className="items-center px-2 mb-8"
      >
        <Text className="text-[32px] font-black tracking-tight text-center text-foreground leading-10">
          Manage group expenses{"\n"}
          <Text className="text-primary">without the stress</Text>
        </Text>

        <Text className="mt-4 text-center text-foreground-secondary font-normal text-base leading-6">
          The precision of a financial tool with the ease of a social app.
          Settle up with roommates, friends, or partners in one click.
        </Text>
      </Animated.View>

      {/* Action Buttons & Badges */}
      <View className="w-full space-y-3">
        <Button
          onPress={goToRegister}
          label="Get Started"
          variant="primary"
          iconRight="arrow-forward"
        />
        <Button onPress={goToLogin} label="Log In" variant="secondary" />
        {/* Trust Elements */}
        <View className="flex-row  gap-2 justify-center items-center space-x-6 pt-6 pb-2">
          <View className="flex-row  justify-center items-center space-x-1">
            <MaterialCommunityIcons
              name="shield-check-outline"
              size={16}
              color={colors.muted}
            />
            <Text className="text-muted text-xs font-bold tracking-wider uppercase">
              SECURE
            </Text>
          </View>
          <View className="flex-row justify-center items-center space-x-1">
            <Ionicons
              name="people-circle-outline"
              size={16}
              color={colors.muted}
            />
            <Text className="text-muted text-xs font-bold tracking-wider uppercase">
              COLLABORATIVE
            </Text>
          </View>
        </View>
        {/* Footer Terms */}
        <Text className="text-center text-xs text-muted font-medium">
          By continuing, you agree to our{" "}
          <Text className="underline text-foreground font-semibold">
            Terms of Service
          </Text>
        </Text>
      </View>
    </View>
  );
}
