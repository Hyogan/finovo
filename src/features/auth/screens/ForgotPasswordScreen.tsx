import { Button } from "@/shared/components/Button";
import { IconButton } from "@/shared/components/IconButton";
import { InputField } from "@/shared/ui/forms/InputField";
import { Logo } from "@/shared/ui/Logo";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "../schemas/auth.schema";

interface ForgotPasswordScreenProps {
  onBackPress: () => void;
  onSubmit: (data: ForgotPasswordFormData) => Promise<void>;
  isLoading?: boolean;
}

export default function ForgotPasswordScreen({
  onBackPress,
  onSubmit,
  isLoading = false,
}: ForgotPasswordScreenProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

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
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <InputField
                label="Email Address"
                placeholder="name@domain.com"
                iconName="mail-outline"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
              />
            )}
          />
        </View>

        {/* Action Button */}
        <View className="w-full">
          <Button
            label={isLoading ? "Sending..." : "Send Verification Code"}
            variant="primary"
            iconRight={isLoading ? undefined : "paper-plane-outline"}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </ScrollView>
  );
}
