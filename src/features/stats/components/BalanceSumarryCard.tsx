import { useThemeColors } from "@/shared/hooks/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  netBalance: number;
  currency: string;
  youOwe: number;
  youAreOwed: number;
};

export function BalanceSummaryCard({
  netBalance,
  currency,
  youOwe,
  youAreOwed,
}: Props) {
  const colors = useThemeColors();
  const isPositive = netBalance >= 0;

  return (
    <View className="bg-surface rounded-3xl border border-border-subtle p-5">
      <Text className="text-foreground-secondary text-xs font-bold tracking-wider uppercase">
        Overall balance
      </Text>

      <View className="flex-row items-baseline mt-2">
        <Text
          className={`text-[36px] font-black tracking-tight ${
            isPositive ? "text-success" : "text-danger"
          }`}
        >
          {isPositive ? "+" : "-"}
          {Math.abs(netBalance).toLocaleString()}
        </Text>
        <Text className="text-foreground-secondary text-base font-semibold ml-2">
          {currency}
        </Text>
      </View>

      <Text className="text-foreground-secondary text-sm mt-1">
        {isPositive ? "You are owed overall" : "You owe overall"}
      </Text>

      <View className="flex-row mt-5 pt-4 border-t border-border-subtle">
        <View className="flex-1 flex-row items-center">
          <View className="w-8 h-8 rounded-full bg-danger/10 items-center justify-center mr-2">
            <Ionicons name="arrow-up" size={16} color={colors.danger} />
          </View>
          <View>
            <Text className="text-foreground-secondary text-xs">You owe</Text>
            <Text className="text-foreground text-sm font-bold">
              {youOwe.toLocaleString()} {currency}
            </Text>
          </View>
        </View>

        <View className="flex-1 flex-row items-center">
          <View className="w-8 h-8 rounded-full bg-success/10 items-center justify-center mr-2">
            <Ionicons name="arrow-down" size={16} color={colors.success} />
          </View>
          <View>
            <Text className="text-foreground-secondary text-xs">
              You are owed
            </Text>
            <Text className="text-foreground text-sm font-bold">
              {youAreOwed.toLocaleString()} {currency}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
