import { Button } from "@/shared/components/Button";
import { IconButton } from "@/shared/components/IconButton";
import { InputField } from "@/shared/ui/forms/InputField";
import { Logo } from "@/shared/ui/Logo";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface RegisterProps {
  onLoginPress: () => void;
  onClosePress: () => void;
  onSubmit: (email: string, fullname: string, password: string) => void;
  isLoading?: boolean; // Good for disabling buttons during requests
}

export default function Register({
  onLoginPress,
  onClosePress,
  onSubmit,
  isLoading,
}: RegisterProps) {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 justify-between px-6 py-6">
        {/* Navigation Bar */}
        <View className="flex-row justify-between items-center h-14">
          <Logo variant="horizontal" size={40} />
          <IconButton iconName="close-outline" onPress={onClosePress} />
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
          <InputField
            label="Full Name"
            placeholder="e.g., Arsène Patrick"
            iconName="person-outline"
          />
          <InputField
            label="Email Address"
            placeholder="name@domain.com"
            iconName="mail-outline"
          />
          <InputField
            label="Security Password"
            placeholder="Choose a strong protection key"
            iconName="lock-closed-outline"
            secureTextEntry
          />
        </View>

        {/* Core Submission Block & Terms Sync */}
        <View className="w-full space-y-4">
          <Button
            label={isLoading ? "creating account" : "Create Account"}
            variant="primary"
            iconRight={isLoading ? undefined : "checkmark"}
            onPress={() => onSubmit(email, fullname, password)}
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
