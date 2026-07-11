import { Button } from "@/shared/components/Button";
import { IconButton } from "@/shared/components/IconButton";
import { InputField } from "@/shared/ui/forms/InputField";
import { Logo } from "@/shared/ui/Logo";
import {
  LoginFormData,
  loginSchema,
} from "@features/auth/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
// 1. Define explicit operational interfaces for the View
interface LoginScreenProps {
  onRegisterPress: () => void;
  onForgotPasswordPress: () => void;
  onEmailVerificationPress: () => void;
  onClosePress: () => void;
  onSubmit: (data: LoginFormData) => void | Promise<void>;
  isLoading?: boolean; // Good for disabling buttons during requests
}

export default function LoginScreen({
  onRegisterPress,
  onForgotPasswordPress,
  onEmailVerificationPress,
  onClosePress,
  onSubmit,
  isLoading = false,
}: LoginScreenProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 justify-between px-6 py-6">
        <View className="flex-row justify-between items-center h-14">
          <Logo variant="horizontal" size={40} />
          <IconButton iconName="close-outline" onPress={onClosePress} />
        </View>

        <View className="mt-6 mb-8">
          <Text className="text-3xl font-black tracking-tight text-foreground">
            Welcome back
          </Text>
          <Text className="text-sm text-foreground-secondary mt-2">
            Log in to settle your balances, split bills, and check group
            histories.
          </Text>
        </View>

        <View className="flex-1 justify-start">
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange, onBlur } }) => (
              <InputField
                error={errors.email?.message}
                label="Email Address"
                placeholder="Enter your email"
                iconName="mail-outline"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <InputField
                label="Password"
                error={errors.password?.message}
                placeholder="Enter your security code"
                iconName="lock-closed-outline"
                secureTextEntry
                showPasswordToggle
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />

          <TouchableOpacity
            onPress={onForgotPasswordPress}
            className="align-self-start ml-1 mt-1 mb-6"
          >
            <Text className="text-sm text-primary font-semibold">
              Forgot security code?
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-full space-y-4">
          {/* Fire the action passing the local input text state values */}
          <Button
            label={isLoading ? "Connecting..." : "Sign In"}
            variant="primary"
            iconRight={isLoading ? undefined : "arrow-forward"}
            onPress={handleSubmit(onSubmit)}
          />

          <View className="flex-row justify-center items-center py-2">
            <Text className="text-sm  text-foreground-secondary font-bold">
              New to Finovo?{" "}
            </Text>
            <TouchableOpacity onPress={onRegisterPress}>
              <Text className="text-sm text-primary font-bold">
                Create an account
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center items-center py-2">
            <Text className="text-sm text-foreground-secondary font-medium">
              Did not get the verification code ?{" "}
            </Text>
            <TouchableOpacity onPress={onEmailVerificationPress}>
              <Text className="text-sm text-primary font-bold">Resend</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
