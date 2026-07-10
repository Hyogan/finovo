import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface TextFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export function TextField({ label, error, ...props }: TextFieldProps) {
  return (
    <View className="w-full space-y-2 mb-4">
      <Text className="text-sm font-semibold text-foreground-secondary px-1">
        {label}
      </Text>
      <TextInput
        className="w-full h-14 bg-background-secondary border border-border-subtle rounded-2xl px-4 text-foreground text-base focus:border-primary"
        placeholderTextColor="#9CA3AF" // Mapped roughly to text-muted
        autoCapitalize="none"
        {...props}
      />
      {error && (
        <Text className="text-xs text-red-500 font-medium px-1 mt-1">
          {error}
        </Text>
      )}
    </View>
  );
}
