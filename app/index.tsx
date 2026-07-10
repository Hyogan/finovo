import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function FinovoOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      tag: "The Problem",
      title: "No More Spreadsheets or WhatsApp Chaos",
      description:
        "Stop dealing with calculation errors and missing expense records between roommates or friends. FINOVO simplifies group expenses.",
      icon: "📊",
    },
    {
      tag: "The Transparency",
      title: "Who Paid? Who Owes Whom?",
      description:
        "Track shared costs automatically. Whether it's rent with Arsène and Kevin or a vacation, see exact balances in real time.",
      icon: "🤝",
    },
  ];

  return (
    <View className="flex-1 bg-finovo-bg justify-between px-6 py-8">
      {/* Top Header Row */}
      <View className="flex-row justify-between items-center h-12">
        <Text className="text-2xl font-black tracking-tight text-white">
          FINO<Text className="text-finovo-primary">VO</Text>
        </Text>

        <TouchableOpacity
          onPress={() => setCurrentStep(1)}
          className="px-3 py-1 bg-finovo-ghost border border-finovo-ghost-border rounded-full"
        >
          <Text className="text-xs font-semibold text-slate-400">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Dynamic Card Using the Ghost Asset Neutral */}
      <View className="p-8 my-auto border border-finovo-ghost-border bg-finovo-ghost rounded-3xl items-center">
        {/* Accent box showing the Alert Orange */}
        <View className="w-20 h-20 items-center justify-center rounded-2xl bg-finovo-alert/10 border border-finovo-alert/20">
          <Text className="text-3xl">{steps[currentStep].icon}</Text>
        </View>

        <View className="mt-6 px-3 py-1 bg-finovo-bg border border-finovo-ghost-border rounded-full">
          <Text className="text-xs font-bold tracking-widest text-finovo-alert uppercase">
            {steps[currentStep].tag}
          </Text>
        </View>

        <Text className="mt-4 text-2xl font-extrabold tracking-tight text-center text-white leading-8">
          {steps[currentStep].title}
        </Text>

        <Text className="mt-3 text-sm text-center text-slate-400 leading-6">
          {steps[currentStep].description}
        </Text>
      </View>

      {/* Bottom Navigation with Primary Emerald */}
      <View className="space-y-4">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setCurrentStep((prev) => (prev === 0 ? 1 : 0))}
          className="w-full py-4 items-center justify-center bg-finovo-primary rounded-2xl shadow-lg shadow-finovo-primary/10"
        >
          <Text className="text-base font-bold text-finovo-bg">
            {currentStep === 1 ? "Create Your First Group" : "Continue"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
