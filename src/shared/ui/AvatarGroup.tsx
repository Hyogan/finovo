import React from "react";
import { View } from "react-native";

interface AvatarGroupProps {
  customStyles?: string[]; // Allows injection of different backgrounds for mockups
}

export function AvatarGroup({
  customStyles = ["bg-muted/40", "bg-primary/20", "bg-muted/60"],
}: AvatarGroupProps) {
  return (
    <View className="flex-row items-center">
      {customStyles.map((bgClass, index) => (
        <View
          key={index}
          className={`w-8 h-8 rounded-full border-2 border-background-secondary ${bgClass} ${
            index > 0 ? "-ml-3" : ""
          }`}
        />
      ))}
    </View>
  );
}
