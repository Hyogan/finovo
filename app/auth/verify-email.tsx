import {
  ResendEmailTokenFormData,
  VerifyEmailFormData,
} from "@/features/auth/schemas/auth.schema";

import VerifyScreen from "@/features/auth/screens/VerifyScreen";
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function VerifyView() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleVerifySubmit = async (data: VerifyEmailFormData) => {
    console.log("verify:", data);
  };

  const handleResendPress = async (data: ResendEmailTokenFormData) => {
    console.log("resend:", data);

    // await resendToken(data);
  };

  return (
    <VerifyScreen
      onSubmit={handleVerifySubmit}
      onResendPress={handleResendPress}
      onBackPress={() => router.replace("/auth/login")}
      isLoading={loading}
    />
  );
}
