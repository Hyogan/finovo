import LoginView from "@/features/auth/screens/LoginScreen";
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Business logic execution handler
  const handleLoginAuthentication = async (email: string, password: string) => {
    if (!email || !password) return alert("Please fill in fields");

    setLoading(true);
    try {
      // Connect to your auth backend framework layer here
      console.log(`Sending values safely to backend service: ${email}`);

      // On success, transition state out
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
