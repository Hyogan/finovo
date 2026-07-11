import { LoginFormData } from "@/features/auth/schemas/login.schema";
import LoginView from "@/features/auth/screens/LoginScreen";
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Business logic execution handler
  const handleLoginAuthentication = async (data: LoginFormData) => {
    // if (!email || !password) return alert("Please fill in fields");
    // console.log(data);

    setLoading(true);
  };

  return (
    <LoginView
      onSubmit={handleLoginAuthentication}
      isLoading={loading}
      onRegisterPress={() => router.push("/auth/register")}
      onForgotPasswordPress={() => router.push("/auth/forgot-password")}
      onEmailVerificationPress={() => router.push("/auth/verify-email")}
      onClosePress={() => router.back()}
    />
  );
}
