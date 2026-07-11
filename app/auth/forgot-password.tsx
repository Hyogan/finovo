import { ForgotPasswordFormData } from "@/features/auth/schemas/auth.schema";
import ForgotPasswordScreen from "@/features/auth/screens/ForgotPasswordScreen";
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function ForgotPasswordView() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Business logic execution handler
  const handleForgotPasswordSubmit = async (data: ForgotPasswordFormData) => {
    // if (!email || !password) return alert("Please fill in fields");
    console.log(data);
    router.navigate("/auth/reset-password");
    // setLoading(true);
  };

  return (
    <ForgotPasswordScreen
      onSubmit={handleForgotPasswordSubmit}
      isLoading={loading}
      onBackPress={() => router.back()}
    />
  );
}
