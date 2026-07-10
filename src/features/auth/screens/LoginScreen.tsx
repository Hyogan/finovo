import { Button } from "@/shared/components/Button";
import { IconButton } from "@/shared/components/IconButton";
import { InputField } from "@/shared/ui/forms/InputField";
import { Logo } from "@/shared/ui/Logo";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

// 1. Define explicit operational interfaces for the View
interface LoginScreenProps {
  onRegisterPress: () => void;
  onForgotPasswordPress: () => void;
  onEmailVerificationPress: () => void;
  onClosePress: () => void;
  onSubmit: (email: string, password: string) => void;
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <InputField
            label="Email Address"
            placeholder="Enter your email"
            iconName="mail-outline"
            value={email}
            onChangeText={setEmail}
          />
          <InputField
            label="Password"
            placeholder="Enter your security code"
            iconName="lock-closed-outline"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
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
            onPress={() => onSubmit(email, password)}
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
