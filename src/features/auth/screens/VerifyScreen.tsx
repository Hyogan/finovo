import { Button } from "@/shared/components/Button";
import { InputField } from "@/shared/ui/forms/InputField";
import { Logo } from "@/shared/ui/Logo";
import ThemeSwitcher from "@/shared/ui/ThemeSwitcher";

import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface VerifyScreenProps {
  onBackPress: () => void;
  onResendPress: (email: string) => void;
  onVerifySubmit: (code: string, email: string) => void;
  isLoading?: boolean;
}

export default function VerifyScreen({
  onBackPress,
  onResendPress,
  onVerifySubmit,
  isLoading = false,
}: VerifyScreenProps) {
  const [step, setStep] = useState<"resend" | "validate">("validate");

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    if (step !== "validate") return;
    if (resendTimer <= 0) return;

    const timer = setInterval(() => {
      setResendTimer((current) => current - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer, step]);

  const handleSendCode = () => {
    if (!email) return;

    onResendPress(email);

    setStep("validate");
    setResendTimer(30);
  };

  const handleResend = () => {
    if (resendTimer > 0) return;

    onResendPress(email);
    setResendTimer(30);
  };

  const handleResendState = () => {
    setStep("resend");
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{
        flexGrow: 1,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 justify-between px-6 py-6">
        {/* Header */}
        <View className="h-14 flex-row items-center justify-between">
          <Logo variant="horizontal" size={40} />

          <View>
            <ThemeSwitcher variant="menu" />
            {/* <IconButton iconName="arrow-back-outline" onPress={onBackPress} /> */}
          </View>
        </View>

        {/* Content */}
        <View className="flex-1 justify-start mt-10">
          {step === "resend" && (
            <>
              <Text className="text-3xl font-black tracking-tight text-foreground">
                Enter your email
              </Text>

              <Text className="mt-3 text-sm leading-5 text-foreground-secondary">
                Enter your email address and we will send you a verification
                code.
              </Text>

              <View className="mt-8">
                <InputField
                  label="Email"
                  placeholder="example@email.com"
                  iconName="mail-outline"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </>
          )}

          {step === "validate" && (
            <>
              <Text className="text-3xl font-black tracking-tight text-foreground">
                Verify your email
              </Text>

              <Text className="mt-3 text-sm leading-5 text-foreground-secondary">
                We sent a verification code to{" "}
                <Text className="font-semibold text-foreground">{email}</Text>.
                Enter the code below to activate your account.
              </Text>

              <View className="mt-8">
                <InputField
                  label="Verification Code"
                  placeholder="Enter 6-digit code"
                  iconName="key-outline"
                  value={code}
                  onChangeText={setCode}
                  keyboardType="number-pad"
                  maxLength={6}
                />

                <View className="mt-3 ml-1 flex-row items-center">
                  <Text className="text-sm font-medium text-foreground-secondary">
                    Didn't receive the code?{" "}
                  </Text>

                  <TouchableOpacity
                    disabled={resendTimer > 0}
                    onPress={handleResendState}
                  >
                    <Text
                      className={`text-sm font-bold ${
                        resendTimer > 0
                          ? "text-foreground-secondary"
                          : "text-primary"
                      }`}
                    >
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Bottom CTA */}
        <View className="w-full">
          {step === "resend" ? (
            <Button
              label="Send Code"
              variant="primary"
              disabled={!email || isLoading}
              onPress={handleSendCode}
            />
          ) : (
            <Button
              label={isLoading ? "Verifying..." : "Verify Account"}
              variant="primary"
              iconRight={isLoading ? undefined : "shield-checkmark-outline"}
              disabled={code.length < 6 || isLoading}
              onPress={() => onVerifySubmit(code, email)}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
