import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { IoniconName } from "@shared/types";
import { Uniwind, useUniwind } from "uniwind";
import { ThemeButton } from "../components/ThemedButton";
import { useThemeIconColor } from "../hooks/theme";

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
}

interface ThemeSwitcherVariantProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

/**
 * Master component
 */
export default function ThemeSwitcher({ variant }: ThemeSwitcherProps) {
  const { theme, hasAdaptiveThemes } = useUniwind();

  // When adaptive theming is on, the resolved theme is still shown as
  // "system" so the System option stays highlighted in the UI.
  const activeTheme: Theme = hasAdaptiveThemes ? "system" : (theme as Theme);

  const setTheme = (newTheme: Theme) => {
    Uniwind.setTheme(newTheme);
  };

  const props: ThemeSwitcherVariantProps = {
    theme: activeTheme,
    setTheme,
  };

  if (variant === "menu") {
    return <ThemeSwitcherMenu {...props} />;
  }

  return <ThemeSwitcherDefault {...props} />;
}

/**
 * Default pill switcher
 */
function ThemeSwitcherDefault({ theme, setTheme }: ThemeSwitcherVariantProps) {
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
            className={`flex-row items-center rounded-full px-3 py-2 ${
              active ? "bg-white dark:bg-zinc-700" : ""
            }`}
          >
            <Ionicons
              name={item.icon}
              size={18}
              className={active ? "text-blue-500" : "text-zinc-500"}
            />

            <Text className="ml-2 text-black dark:text-white">
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
function ThemeSwitcherMenu({ theme, setTheme }: ThemeSwitcherVariantProps) {
  const [open, setOpen] = useState(false);
  const iconColor = useThemeIconColor();
  const rotation = useSharedValue(0);

  // No side effects inside the updater — React (Strict Mode) may invoke
  // state updaters more than once per call, and mutating a shared value
  // in there re-triggers withSpring mid-flight, causing the panel to
  // visibly stutter/snap back instead of animating in cleanly.
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

  // Don't show the currently active theme in the options list — it's
  // already represented by the main button itself.
  const options = themes.filter((item) => item.name !== theme);

  return (
    <View className="h-12 w-12 items-center justify-center">
      {/* Floating options */}
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
            active={item.name === theme}
            onPress={() => {
              setTheme(item.name);
              toggleMenu();
            }}
          >
            <Ionicons name={item.icon} size={20} color={iconColor} />
          </ThemeButton>
        ))}
      </Animated.View>

      {/* Main button */}
      <Pressable
        onPress={toggleMenu}
        accessibilityRole="button"
        accessibilityLabel="Open theme menu"
        accessibilityState={{ expanded: open }}
        className="
          h-12 w-12
          rounded-full
          items-center
          justify-center
          bg-background-secondary
          shadow-lg
        "
      >
        <Animated.View style={iconStyle}>
          <Ionicons name={iconFor(theme)} size={22} color={iconColor} />
        </Animated.View>
      </Pressable>
    </View>
  );
}
