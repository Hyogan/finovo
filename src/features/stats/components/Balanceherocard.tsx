import React from "react";
import { Text, View } from "react-native";

type Props = {
  netBalance: number;
  currency: string;
  youOwe: number;
  youAreOwed: number;
};

export function BalanceHeroCard({
  netBalance,
  currency,
  youOwe,
  youAreOwed,
}: Props) {
  const isPositive = netBalance >= 0;

  return (
    <View className="bg-inverse-btn rounded-3xl p-6">
      <Text className="text-inverse-btn-text/60 text-xs font-bold uppercase tracking-wider">
        Overall balance
      </Text>

      <View className="flex-row items-baseline mt-2">
        <Text className="text-inverse-btn-text text-[38px] font-black tracking-tight">
          {isPositive ? "+" : "-"}
          {Math.abs(netBalance).toLocaleString()}
        </Text>
        <Text className="text-inverse-btn-text/60 text-base font-semibold ml-2">
          {currency}
        </Text>
      </View>

      <Text className="text-inverse-btn-text/70 text-sm mt-1">
        {isPositive ? "You are owed overall" : "You owe overall"}
      </Text>

      <View className="flex-row gap-3 mt-6">
        <View className="flex-1 bg-inverse-btn-text/10 rounded-2xl px-3.5 py-3">
          <Text className="text-inverse-btn-text/50 text-[11px] font-semibold">
            You owe
          </Text>
          <Text className="text-inverse-btn-text font-bold mt-0.5">
            {youOwe.toLocaleString()} {currency}
          </Text>
        </View>
        <View className="flex-1 bg-inverse-btn-text/10 rounded-2xl px-3.5 py-3">
          <Text className="text-inverse-btn-text/50 text-[11px] font-semibold">
            You are owed
          </Text>
          <Text className="text-inverse-btn-text font-bold mt-0.5">
            {youAreOwed.toLocaleString()} {currency}
          </Text>
        </View>
      </View>
    </View>
  );
}
