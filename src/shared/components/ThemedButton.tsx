import { Pressable, PressableProps } from "react-native";
import { useUniwind } from "uniwind";

interface ThemeButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  active?: boolean;
  props?: PressableProps;
}

export function ThemeButton({
  children,
  onPress,
  active = false,
  props,
}: ThemeButtonProps) {
  const { theme } = useUniwind();

  const isDark = theme === "dark";

  const backgroundColor = active
    ? "rgba(16,185,129,0.14)"
    : isDark
      ? "rgba(255,255,255,0.08)"
      : "rgba(15,23,42,0.05)";

  const borderColor = active
    ? "#10b981"
    : isDark
      ? "rgba(255,255,255,0.08)"
      : "rgba(15,23,42,0.08)";

  return (
    <Pressable
      onPress={onPress}
      {...props}
      android_ripple={{
        color: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)",
        borderless: true,
        radius: 24,
      }}
      style={({ pressed }) => ({
        height: 48,
        width: 48,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,

        backgroundColor,

        borderWidth: active ? 2 : 1,
        borderColor,

        opacity: pressed ? 0.8 : 1,
        transform: [{ scale: pressed ? 0.96 : 1 }],
      })}
    >
      {children}
    </Pressable>
  );
}
