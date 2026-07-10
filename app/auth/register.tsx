import RegisterScreen from "@/features/auth/screens/RegisterScreen";
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Business logic execution handler
  const handleLoginAuthentication = async (
    email: string,
    fullName: string,
    password: string,
  ) => {
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
    <RegisterScreen
      onSubmit={handleLoginAuthentication}
      isLoading={loading}
      onLoginPress={() => router.push("/auth/login")}
      onClosePress={() => router.back()}
    />
  );
}
// onNavigateToLogin,
// onNavigateEmailVerificationPress,
// onClosePress,
// onSubmit,
// isLoading,
