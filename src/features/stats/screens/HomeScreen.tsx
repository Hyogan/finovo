import { useThemeColors } from "@/shared/hooks/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { BalanceHeroCard } from "../components/Balanceherocard";
import { GroupListItem } from "../components/GroupListItem";
import { QuickActionButton } from "../components/QuickActionButton";

// TODO: replace with real data from useGroups() / useUserBalance() hooks
const MOCK_GROUPS = [
  {
    id: "1",
    name: "Apartment Bonapriso",
    memberCount: 4,
    balance: 75000,
    currency: "FCFA",
  },
  {
    id: "2",
    name: "Kribi Trip",
    memberCount: 6,
    balance: -20000,
    currency: "FCFA",
  },
  {
    id: "3",
    name: "Wedding Committee",
    memberCount: 12,
    balance: 0,
    currency: "FCFA",
  },
];

const MOCK_ACTIVITY = [
  {
    id: "a1",
    title: 'Vanessa added "Groceries"',
    subtitle: "Apartment Bonapriso · Today",
    amount: 12500,
  },
  {
    id: "a2",
    title: "Kevin settled up",
    subtitle: "Kribi Trip · Yesterday",
    amount: -50000,
  },
];

export default function Dashboard() {
  const colors = useThemeColors();

  const youOwe = MOCK_GROUPS.filter((g) => g.balance < 0).reduce(
    (sum, g) => sum + Math.abs(g.balance),
    0,
  );
  const youAreOwed = MOCK_GROUPS.filter((g) => g.balance > 0).reduce(
    (sum, g) => sum + g.balance,
    0,
  );
  const netBalance = youAreOwed - youOwe;

  return (
    <ScrollView
      className="flex-1 bg-background px-6"
      contentContainerStyle={{ paddingTop: 20, paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      <BalanceHeroCard
        netBalance={netBalance}
        currency="FCFA"
        youOwe={youOwe}
        youAreOwed={youAreOwed}
      />

      <View className="flex-row mt-5">
        <QuickActionButton
          icon="add"
          label="Add expense"
          onPress={() => router.push("/add-expense")}
        />
        <QuickActionButton
          icon="swap-horizontal"
          label="Settle up"
          onPress={() => router.push("/settlements/new")}
        />
        <QuickActionButton
          icon="qr-code-outline"
          label="Invite"
          onPress={() => router.push("/groups/invite")}
        />
      </View>

      <View className="flex-row justify-between items-center mt-8 mb-3">
        <Text className="text-foreground font-bold text-base">Your groups</Text>
        <Pressable onPress={() => router.push("/groups")}>
          <Text className="text-primary text-sm font-semibold">See all</Text>
        </Pressable>
      </View>

      {MOCK_GROUPS.length === 0 ? (
        <View className="items-center bg-card rounded-2xl border border-border-subtle py-10 px-6">
          <Ionicons name="people-outline" size={28} color={colors.muted} />
          <Text className="text-foreground-secondary text-sm text-center mt-3">
            No groups yet. Create one to start splitting expenses.
          </Text>
        </View>
      ) : (
        <View>
          {MOCK_GROUPS.map((group) => (
            <GroupListItem key={group.id} {...group} />
          ))}
        </View>
      )}

      <Text className="text-foreground font-bold text-base mt-6 mb-3">
        Recent activity
      </Text>

      <View className="gap-2">
        {MOCK_ACTIVITY.map((activity) => (
          <View
            key={activity.id}
            className="flex-row justify-between items-center bg-card rounded-2xl border border-border-subtle p-4"
          >
            <View className="flex-1 pr-3">
              <Text
                className="text-foreground text-sm font-semibold"
                numberOfLines={1}
              >
                {activity.title}
              </Text>
              <Text className="text-foreground-secondary text-xs mt-0.5">
                {activity.subtitle}
              </Text>
            </View>
            <Text
              className={`text-sm font-bold ${
                activity.amount >= 0 ? "text-primary" : "text-danger"
              }`}
            >
              {activity.amount >= 0 ? "+" : "-"}
              {Math.abs(activity.amount).toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
