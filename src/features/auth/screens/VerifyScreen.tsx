import { Button } from "@/shared/components/Button";
import { InputField } from "@/shared/ui/forms/InputField";
import { Logo } from "@/shared/ui/Logo";
import ThemeSwitcher from "@/shared/ui/ThemeSwitcher";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import {
  ResendEmailTokenFormData,
  resendEmailTokenSchema,
  VerifyEmailFormData,
  verifyEmailSchema,
} from "../schemas/auth.schema";

interface VerifyScreenProps {
  onBackPress: () => void;
  onResendPress: (data: ResendEmailTokenFormData) => Promise<void>;
  onSubmit: (data: VerifyEmailFormData) => Promise<void>;
  isLoading?: boolean;
}

export default function VerifyScreen({
  onBackPress,
  onResendPress,
  onSubmit,
  isLoading = false,
}: VerifyScreenProps) {
  const [step, setStep] = useState<"resend" | "validate">("validate");
  const [resendTimer, setResendTimer] = useState(30);

  const {
    control: resendControl,
    handleSubmit: handleResendSubmit,
    watch: watchResend,
    formState: { errors: resendErrors },
  } = useForm<ResendEmailTokenFormData>({
    resolver: zodResolver(resendEmailTokenSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
  });

  const email = watchResend("email");

  useEffect(() => {
    if (step !== "validate" || resendTimer <= 0) return;

    const timer = setInterval(() => {
      setResendTimer((value) => value - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [step, resendTimer]);

  const handleResend = async (data: ResendEmailTokenFormData) => {
    await onResendPress(data);

    setStep("validate");
    setResendTimer(30);
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 justify-between px-6 py-6">
        <View className="h-14 flex-row items-center justify-between">
          <Logo variant="horizontal" size={40} />
          <ThemeSwitcher variant="menu" />
        </View>

        <View className="mt-10 flex-1">
          {step === "resend" && (
            <>
              <Text className="text-3xl font-black text-foreground">
                Enter your email
              </Text>

              <Text className="mt-3 text-sm text-foreground-secondary">
                Enter your email address and we will send you a verification
                code.
              </Text>

              <View className="mt-8">
                <Controller
                  name="email"
                  control={resendControl}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <InputField
                      label="Email"
                      placeholder="example@email.com"
                      iconName="mail-outline"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      error={resendErrors.email?.message}
                    />
                  )}
                />
              </View>
            </>
          )}

          {step === "validate" && (
            <>
              <Text className="text-3xl font-black text-foreground">
                Verify your email
              </Text>

              <Text className="mt-3 text-sm text-foreground-secondary">
                Enter the verification code sent to your email.
              </Text>

              <View className="mt-8">
                <Controller
                  name="token"
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <InputField
                      label="Verification Code"
                      placeholder="Enter 6-digit code"
                      iconName="key-outline"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="number-pad"
                      maxLength={6}
                      error={errors.token?.message}
                    />
                  )}
                />

                <View className="mt-3 flex-row">
                  <Text className="text-sm text-foreground-secondary">
                    Didn't receive the code?{" "}
                  </Text>

                  <TouchableOpacity
                    disabled={resendTimer > 0}
                    onPress={() => setStep("resend")}
                  >
                    <Text
                      className={`font-bold ${
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

        <View className="w-full">
          {step === "resend" ? (
            <Button
              label="Send Code"
              variant="primary"
              disabled={isLoading}
              onPress={handleResendSubmit(handleResend)}
            />
          ) : (
            <Button
              label={isLoading ? "Verifying..." : "Verify Account"}
              variant="primary"
              iconRight="shield-checkmark-outline"
              disabled={isLoading}
              onPress={handleSubmit(onSubmit)}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
