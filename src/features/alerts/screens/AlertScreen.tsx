import { Button } from "@/shared/components/Button";
import { AlertModal } from "@features/alerts/components/AlertModal";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function AlertScreenDemo() {
  const [alertConfig, setAlertConfig] = useState<{
    visible: boolean;
    type: "info" | "warning" | "danger" | "success";
    title: string;
    description: string;
  }>({
    visible: false,
    type: "info",
    title: "",
    description: "",
  });

  const triggerAlert = (type: "info" | "warning" | "danger" | "success") => {
    const dataMap = {
      danger: {
        title: "Delete Group?",
        description:
          "Are you sure you want to delete 'Apartment Bonapriso'? This will completely wipe all ledger entries for every member.",
      },
      success: {
        title: "Settle Up Successful",
        description:
          "Your balance entry of 20,000 FCFA for the Kribi Trip has been processed successfully.",
      },
      warning: {
        title: "Unsettled Balances",
        description:
          "You currently owe 5,000 FCFA on the Family Budget. Please resolve liabilities before exiting.",
      },
      info: {
        title: "System Update",
        description:
          "New group metrics track individual spending spikes. Tap options on your dashboard to review configuration.",
      },
    };

    setAlertConfig({
      visible: true,
      type,
      ...dataMap[type],
    });
  };

  return (
    <View className="flex-1 bg-background px-6 justify-center space-y-4">
      <Text className="text-center text-foreground font-black text-xl mb-4">
        Alert Architecture Controls
      </Text>

      <Button
        label="Trigger Danger Dialog"
        variant="primary"
        onPress={() => triggerAlert("danger")}
      />
      <Button
        label="Trigger Success Toast"
        variant="secondary"
        onPress={() => triggerAlert("success")}
      />
      <Button
        label="Trigger Warning State"
        variant="secondary"
        onPress={() => triggerAlert("warning")}
      />

      {/* Embedded Declarative Alert Modal Element */}
      <AlertModal
        visible={alertConfig.visible}
        type={alertConfig.type}
        title={alertConfig.title}
        description={alertConfig.description}
        primaryActionLabel="Confirm Action"
        onPrimaryAction={() =>
          console.log("Primary action verified via systemic execution")
        }
        onClose={() => setAlertConfig((prev) => ({ ...prev, visible: false }))}
      />
    </View>
  );
}
