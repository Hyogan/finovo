import { RegisterFormData } from "@/features/auth/schemas/auth.schema";
import RegisterScreen from "@/features/auth/screens/RegisterScreen";
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Business logic execution handler
  const handleRegisterSubmit = async (data: RegisterFormData) => {
    // if (!email || !password) return alert("Please fill in fields");
    console.log(data);
    // setLoading(true);
    // try {
    //   // Connect to your auth backend framework layer here
    //   console.log(`Sending values safely to backend service: ${data.email}`);

    //   // On success, transition state out
    //   router.replace("/(tabs)/home");
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <RegisterScreen
      onSubmit={handleRegisterSubmit}
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
