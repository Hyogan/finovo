import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { IoniconName } from "../types";

interface IconButtonProps extends TouchableOpacityProps {
  iconName: IoniconName;
  size?: number;
}

export function IconButton({ iconName, size = 20, ...props }: IconButtonProps) {
  return (
    <TouchableOpacity
      className="w-8 h-8 items-center justify-center rounded-full border border-border"
      {...props}
    >
      <Ionicons
        name={iconName as any}
        size={size}
        className="text-foreground-secondary"
      />
    </TouchableOpacity>
  );
}
