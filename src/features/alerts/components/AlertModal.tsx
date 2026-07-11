import { Button } from "@/shared/components/Button";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Text, TouchableWithoutFeedback, View } from "react-native";

interface AlertModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  type?: "info" | "warning" | "danger" | "success";
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
}

export function AlertModal({
  visible,
  onClose,
  title,
  description,
  type = "info",
  primaryActionLabel,
  onPrimaryAction,
}: AlertModalProps) {
  // Map contextual types to systemic icons & brand tokens
  const contextMap = {
    info: {
      icon: "information-circle-outline",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    warning: {
      icon: "warning-outline",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    danger: {
      icon: "alert-circle-outline",
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    success: {
      icon: "checkmark-circle-outline",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  };

  const currentContext = contextMap[type];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        {/* Dimmed backdrop blur equivalent */}
        <View className="flex-1 bg-black/40 justify-center items-center px-6">
          <TouchableWithoutFeedback>
            {/* Modal Body */}
            <View className="w-full max-w-sm bg-background border border-border-subtle p-6 rounded-[32px] shadow-2xl items-center">
              {/* Contextual Icon Header */}
              <View
                className={`w-14 h-14 ${currentContext.bg} rounded-full items-center justify-center mb-4`}
              >
                <Ionicons
                  name={currentContext.icon as any}
                  size={28}
                  className={currentContext.color}
                />
              </View>

              {/* Message Typography Stack */}
              <Text className="text-xl font-black text-foreground text-center tracking-tight">
                {title}
              </Text>
              <Text className="text-sm text-foreground-secondary text-center mt-2 leading-5">
                {description}
              </Text>

              {/* Action Stacks */}
              <View className="w-full space-y-2 mt-6">
                {primaryActionLabel && onPrimaryAction && (
                  <Button
                    label={primaryActionLabel}
                    variant="primary"
                    onPress={() => {
                      onPrimaryAction();
                      onClose();
                    }}
                  />
                )}
                <Button label="Cancel" variant="secondary" onPress={onClose} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
