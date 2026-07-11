import { GroupListItem } from "@/features/stats/components/GroupListItem";
import { useThemeColors } from "@/shared/hooks/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

// TODO: replace with real data from useGroups() hook
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
  {
    id: "4",
    name: "Startup Team",
    memberCount: 5,
    balance: 15000,
    currency: "FCFA",
  },
  {
    id: "5",
    name: "Family budget",
    memberCount: 3,
    balance: -5000,
    currency: "FCFA",
  },
];

type Filter = "all" | "owe" | "owed";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "owe", label: "You owe" },
  { key: "owed", label: "Owed to you" },
];

export default function Groups() {
  const colors = useThemeColors();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filteredGroups = useMemo(() => {
    return MOCK_GROUPS.filter((group) => {
      const matchesQuery = group.name
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesFilter =
        filter === "all" ||
        (filter === "owe" && group.balance < 0) ||
        (filter === "owed" && group.balance > 0);
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <ScrollView
      className="flex-1 bg-background px-6"
      contentContainerStyle={{ paddingTop: 16, paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Search */}
      <View className="flex-row items-center bg-card border border-border-subtle rounded-2xl px-4 h-12">
        <Ionicons name="search" size={18} color={colors.muted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search groups"
          placeholderTextColor={colors.muted}
          className="flex-1 ml-2 text-foreground text-sm"
        />
      </View>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-4"
        contentContainerStyle={{ gap: 8 }}
      >
        {FILTERS.map((f) => {
          const isActive = filter === f.key;
          return (
            <Pressable
              key={f.key}
              onPress={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-full border ${
                isActive
                  ? "bg-primary border-primary"
                  : "bg-ghost-surface border-ghost-border"
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  isActive ? "text-white" : "text-foreground-secondary"
                }`}
              >
                {f.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* List */}
      <View className="mt-5">
        {filteredGroups.length === 0 ? (
          <View className="items-center bg-card rounded-2xl border border-border-subtle py-10 px-6">
            <Ionicons name="people-outline" size={28} color={colors.muted} />
            <Text className="text-foreground-secondary text-sm text-center mt-3">
              {query
                ? "No groups match your search."
                : "No groups in this filter yet."}
            </Text>
          </View>
        ) : (
          filteredGroups.map((group) => (
            <GroupListItem key={group.id} {...group} />
          ))
        )}
      </View>
    </ScrollView>
  );
}
