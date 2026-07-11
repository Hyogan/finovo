import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { useThemeColors } from "@shared/hooks/theme";
import { IoniconName } from "@shared/types";
import { Uniwind, useUniwind } from "uniwind";
import { ThemeButton } from "../components/ThemedButton";

type Theme = "light" | "dark" | "system";

interface ThemeItem {
  name: Theme;
  label: string;
  icon: IoniconName;
}

const themes: ThemeItem[] = [
  {
    name: "light",
    label: "Light",
    icon: "sunny",
  },
  {
    name: "dark",
    label: "Dark",
    icon: "moon",
  },
  {
    name: "system",
    label: "System",
    icon: "desktop-outline",
  },
];

interface ThemeSwitcherProps {
  variant: "default" | "menu";
  size?: "sm" | "md" | "lg";
}

interface ThemeSwitcherVariantProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  size: "sm" | "md" | "lg";
}

const defaultSizeConfig = {
  sm: {
    icon: 14,
    button: "px-2 py-1",
    text: "text-xs",
  },
  md: {
    icon: 18,
    button: "px-3 py-2",
    text: "text-sm",
  },
  lg: {
    icon: 22,
    button: "px-4 py-3",
    text: "text-base",
  },
};

const menuSizeConfig = {
  sm: {
    container: "h-9 w-9",
    icon: 16,
    optionIcon: 16,
  },
  md: {
    container: "h-12 w-12",
    icon: 22,
    optionIcon: 20,
  },
  lg: {
    container: "h-14 w-14",
    icon: 26,
    optionIcon: 24,
  },
};

/**
 * Master component
 */
export default function ThemeSwitcher({
  variant,
  size = "md",
}: ThemeSwitcherProps) {
  const { theme, hasAdaptiveThemes } = useUniwind();

  const activeTheme: Theme = hasAdaptiveThemes ? "system" : (theme as Theme);

  const setTheme = (newTheme: Theme) => {
    Uniwind.setTheme(newTheme);
  };

  const props: ThemeSwitcherVariantProps = {
    theme: activeTheme,
    setTheme,
    size,
  };

  if (variant === "menu") {
    return <ThemeSwitcherMenu {...props} />;
  }

  return <ThemeSwitcherDefault {...props} />;
}

/**
 * Default pill switcher
 */
function ThemeSwitcherDefault({
  theme,
  setTheme,
  size,
}: ThemeSwitcherVariantProps) {
  const colors = useThemeColors();
  const config = defaultSizeConfig[size];

  return (
    <View className="flex-row gap-2 rounded-full bg-zinc-200 p-1 dark:bg-zinc-900">
      {themes.map((item) => {
        const active = item.name === theme;

        return (
          <Pressable
            key={item.name}
            onPress={() => setTheme(item.name)}
            accessibilityRole="button"
            accessibilityLabel={`Switch to ${item.label} theme`}
            accessibilityState={{ selected: active }}
            className={`flex-row items-center rounded-full ${config.button} ${
              active ? "bg-white dark:bg-zinc-700" : ""
            }`}
          >
            <Ionicons
              name={item.icon}
              size={config.icon}
              color={active ? colors.primary : colors.muted}
            />

            <Text className={`ml-2 ${config.text} text-black dark:text-white`}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/**
 * Animated menu switcher
 */
function ThemeSwitcherMenu({
  theme,
  setTheme,
  size,
}: ThemeSwitcherVariantProps) {
  const [open, setOpen] = useState(false);
  const colors = useThemeColors();
  const rotation = useSharedValue(0);

  const config = menuSizeConfig[size];

  const toggleMenu = () => {
    const next = !open;

    rotation.value = withSpring(next ? 180 : 0);
    setOpen(next);
  };

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${rotation.value}deg`,
      },
    ],
  }));

  const optionStyle = useAnimatedStyle(() => ({
    opacity: withTiming(open ? 1 : 0, {
      duration: 200,
    }),
    transform: [
      {
        translateY: withSpring(open ? 0 : -15),
      },
      {
        scale: withSpring(open ? 1 : 0.8),
      },
    ],
  }));

  const iconFor = (t: Theme): IoniconName => {
    const found = themes.find((item) => item.name === t);

    return found ? found.icon : "sunny";
  };

  const options = themes.filter((item) => item.name !== theme);

  return (
    <View className={`${config.container} items-center justify-center`}>
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 60,
            gap: 8,
          },
          optionStyle,
        ]}
        pointerEvents={open ? "auto" : "none"}
      >
        {options.map((item) => (
          <ThemeButton
            key={item.name}
            active={item.name === theme}
            onPress={() => {
              setTheme(item.name);
              toggleMenu();
            }}
          >
            <Ionicons
              name={item.icon}
              size={config.optionIcon}
              color={colors.primary}
            />
          </ThemeButton>
        ))}
      </Animated.View>

      <ThemeButton
        onPress={toggleMenu}
        accessibilityRole="button"
        accessibilityLabel="Open theme menu"
        accessibilityState={{ expanded: open }}
      >
        <Animated.View style={iconStyle}>
          <Ionicons
            name={iconFor(theme)}
            size={config.icon}
            color={colors.primary}
          />
        </Animated.View>
      </ThemeButton>
    </View>
  );
}
