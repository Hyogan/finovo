import Images from "@assets/images";
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
} from "react-native";

type LogoVariant = "icon" | "horizontal" | "vertical";
type LogoTheme = "colored" | "white";

interface LogoProps {
  variant?: LogoVariant;
  theme?: LogoTheme;
  size?: number;
  style?: StyleProp<ImageStyle>;
}

export function Logo({
  variant = "icon",
  theme = "colored",
  size = 100,
  style,
}: LogoProps) {
  const textColor = theme === "white" ? "#FFFFFF" : "#111827";

  const icon = (
    <Image
      source={Images.logoIcon}
      style={[
        styles.icon,
        {
          width: size,
          height: size,
        },
        style,
      ]}
      resizeMode="contain"
    />
  );

  if (variant === "icon") {
    return icon;
  }

  return (
    <View
      style={variant === "horizontal" ? styles.horizontal : styles.vertical}
    >
      {icon}

      <Text
        style={[
          styles.text,
          {
            color: textColor,
            fontSize: size * 0.35,
          },
        ]}
      >
        Finovo
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  vertical: {
    alignItems: "center",
    gap: 8,
  },

  icon: {},

  text: {
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
