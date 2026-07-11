import { Button } from "@/shared/components/Button";
import { IconButton } from "@/shared/components/IconButton";
import { InputField } from "@/shared/ui/forms/InputField";
import { Logo } from "@/shared/ui/Logo";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "../schemas/auth.schema";

interface ResetPasswordScreenProps {
  onSubmit: (data: ResetPasswordFormData) => Promise<void>;
  isLoading?: boolean;
  onBackPress: () => void;
}

export default function ResetPasswordScreen({
  onSubmit,
  isLoading = false,
  onBackPress,
}: ResetPasswordScreenProps) {
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // const handleUpdateSubmit = () => {
  //   if (!password || password !== confirmPassword) {
  //     return; // Add localized alert boundaries or toast triggers here as needed
  //   }
  //   onSubmit(password);
  // };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 justify-between px-6 py-6">
        {/* Navigation Head Placeholder */}
        <View className="flex-row justify-between items-center h-14">
          <Logo variant="horizontal" size={40} />
          <IconButton iconName="arrow-back-outline" onPress={onBackPress} />
        </View>

        {/* Explanatory Block header copy */}
        <View className="mt-6 mb-8">
          <Text className="text-3xl font-black tracking-tight text-foreground">
            Reset security password
          </Text>
          <Text className="text-sm text-foreground-secondary mt-2">
            Create a fresh, resilient security password to shield access to your
            mutual finance logs.
          </Text>
        </View>

        {/* Form Mutation Inputs */}
        <View className="flex-1 justify-start">
          <Controller
            name="password"
            control={control}
            render={({ field: { value, onBlur, onChange } }) => (
              <InputField
                label="New Security Password"
                placeholder="Choose new strong code"
                iconName="lock-open-outline"
                secureTextEntry
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
                label="Confirm New Password"
                placeholder="Re-enter security password"
                iconName="lock-closed-outline"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.confirmPassword?.message}
              />
            )}
          />
        </View>

        {/* Action Button */}
        <View className="w-full">
          <Button
            label={isLoading ? "Updating..." : "Update Password"}
            variant="primary"
            iconRight={isLoading ? undefined : "lock-closed-outline"}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </ScrollView>
  );
}
