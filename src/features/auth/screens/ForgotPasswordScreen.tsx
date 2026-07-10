import { Button } from "@/shared/components/Button";
import { IconButton } from "@/shared/components/IconButton";
import { InputField } from "@/shared/ui/forms/InputField";
import { Logo } from "@/shared/ui/Logo";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

interface ForgotPasswordScreenProps {
  onBackPress: () => void;
  onSubmit: (email: string) => void;
  isLoading?: boolean;
}

export default function ForgotPasswordScreen({
  onBackPress,
  onSubmit,
  isLoading = false,
}: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState("");

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 justify-between px-6 py-6">
        {/* Navigation Head */}
        <View className="flex-row justify-between items-center h-14">
          <Logo variant="horizontal" size={40} />
          <IconButton iconName="arrow-back-outline" onPress={onBackPress} />
        </View>

        {/* Text Header */}
        <View className="mt-6 mb-8">
          <Text className="text-3xl font-black tracking-tight text-foreground">
            Recover account
          </Text>
          <Text className="text-sm text-foreground-secondary mt-2">
            Enter your registered email address below. We will send you a
            verification code to safely reset your credentials.
          </Text>
        </View>

        {/* Input Fields Container */}
        <View className="flex-1 justify-start">
          <InputField
            label="Email Address"
            placeholder="name@domain.com"
            iconName="mail-outline"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Action Button */}
        <View className="w-full">
          <Button
            label={isLoading ? "Sending..." : "Send Verification Code"}
            variant="primary"
            iconRight={isLoading ? undefined : "paper-plane-outline"}
            onPress={() => onSubmit(email)}
          />
        </View>
      </View>
    </ScrollView>
  );
}
