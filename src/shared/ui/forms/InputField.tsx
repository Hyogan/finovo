import { useThemeColors } from "@/shared/hooks/theme";
import { AutoCapitalizeType } from "@/shared/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { KeyboardType, Text, TextInput, View } from "react-native";

interface InputProps {
  label: string;
  placeholder: string;
  iconName: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  value?: string;
  keyboardType?: KeyboardType;
  maxLength?: number;
  onChangeText?: (text: string) => void;
  autoCapitalize?: AutoCapitalizeType;
}

export function InputField({
  label,
  placeholder,
  iconName,
  secureTextEntry,
  value,
  onChangeText,
  keyboardType = "default",
  maxLength = 500,
  autoCapitalize = "none",
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const colors = useThemeColors();
  return (
    <View className="w-full space-y-1.5 mb-4">
      <Text className="text-xs font-semibold text-foreground-secondary ml-1 tracking-wide uppercase">
        {label}
      </Text>

      <View
        className={`w-full h-14 rounded-2xl flex-row items-center px-4 border transition-all ${
          isFocused
            ? "border-primary bg-background bg-opacity-10"
            : "border-border-subtle bg-ghost-surface"
        }`}
      >
        <Ionicons
          name={iconName}
          size={20}
          color={isFocused ? colors.primary : colors.muted}
          className={`mr-3 ${isFocused ? "text-primary" : "text-muted"}`}
        />

        <TextInput
          value={value}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholder={placeholder}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#94A3B8"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize={autoCapitalize}
          className="flex-1 h-full text-foreground text-base font-medium"
        />
      </View>
    </View>
  );
}
