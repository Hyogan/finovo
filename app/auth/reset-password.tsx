import { ResetPasswordFormData } from "@/features/auth/schemas/auth.schema";
import ResetPasswordScreen from "@/features/auth/screens/ResetPasswordScreen";
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function ResetPasswordView() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Business logic execution handler
  const handleResetPasswordSubmit = async (data: ResetPasswordFormData) => {
    // if (!email || !password) return alert("Please fill in fields");
    // console.log(data);
    router.push("/auth/reset-password");
    setLoading(true);
  };

  return (
    <ResetPasswordScreen
      onSubmit={handleResetPasswordSubmit}
      isLoading={loading}
      onBackPress={() => router.back()}
    />
  );
}
