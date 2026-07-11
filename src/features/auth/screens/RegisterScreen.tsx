import { Button } from "@/shared/components/Button";
import { InputField } from "@/shared/ui/forms/InputField";
import { Logo } from "@/shared/ui/Logo";
import ThemeSwitcher from "@/shared/ui/ThemeSwitcher";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { RegisterFormData, registerSchema } from "../schemas/auth.schema";

interface RegisterProps {
  onLoginPress: () => void;
  onClosePress: () => void;
  onSubmit: (data: RegisterFormData) => Promise<void>;
  isLoading?: boolean; // Good for disabling buttons during requests
}

export default function Register({
  onLoginPress,
  onClosePress,
  onSubmit,
  isLoading,
}: RegisterProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 justify-between px-6 py-6">
        {/* Navigation Bar */}
        <View className="flex-row justify-between items-center h-14">
          <Logo variant="horizontal" size={40} />
          {/* <IconButton iconName="close-outline" onPress={onClosePress} /> */}
          <ThemeSwitcher variant="menu" />
        </View>

        {/* Heading Statement */}
        <View className="mt-6 mb-8">
          <Text className="text-3xl font-black tracking-tight text-foreground">
            Get started completely free
          </Text>
          <Text className="text-sm text-foreground-secondary mt-2">
            Join the automated platform built to calculate, secure, and settle
            group balances instantly.
          </Text>
        </View>

        {/* Full Registration InputField Blocks */}
        <View className="flex-1 justify-start">
          <Controller
            name="fullname"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <InputField
                label="Full Name"
                placeholder="e.g., Arsène Patrick"
                iconName="person-outline"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.fullname?.message}
              />
            )}
          />
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

          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <InputField
                label="Security Password"
                placeholder="Choose a strong protection key"
                iconName="lock-closed-outline"
                secureTextEntry
                showPasswordToggle
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <InputField
                label="Password confirmation"
                placeholder="Password confirmation"
                iconName="lock-closed-outline"
                secureTextEntry
                showPasswordToggle
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.confirmPassword?.message}
              />
            )}
          />
        </View>

        {/* Core Submission Block & Terms Sync */}
        <View className="w-full space-y-4">
          <Button
            label={isLoading ? "creating account" : "Create Account"}
            variant="primary"
            iconRight={isLoading ? undefined : "checkmark"}
            onPress={handleSubmit(onSubmit)}
          />

          {/* Legal Compliance check statement */}
          <Text className="text-center text-xs text-muted font-medium px-4 leading-4">
            By registering, you acknowledge and agree that your mutual data will
            be visible transparently to invited group members.
          </Text>

          {/* Alternative Login routing toggle */}
          <View className="flex-row justify-center items-center pt-2">
            <Text className="text-sm text-foreground-secondary font-medium">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={onLoginPress}>
              <Text className="text-sm text-primary font-bold">Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
