import { useThemeColors } from "@/shared/hooks/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

interface InputFieldProps {
  label: string;
  placeholder: string;
  iconName: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

export function InputField({
  label,
  placeholder,
  iconName,
  secureTextEntry,
  value,
  onChangeText,
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const colors = useThemeColors();
  return (
    <View className="w-full mb-4">
      <Text className="text-xs font-bold text-foreground-secondary ml-1 mb-1.5 tracking-wider uppercase">
        {label}
      </Text>

      <View
        className={`w-full h-14 rounded-2xl flex-row items-center px-4 border ${
          isFocused
            ? "border-primary bg-primary/5"
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
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#94A3B8"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 h-full text-foreground text-base font-medium"
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}
