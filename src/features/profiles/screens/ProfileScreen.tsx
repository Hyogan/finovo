import { AlertModal } from "@/features/alerts/components/AlertModal";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { ProfileHeader } from "../component/ProfileHeader";
import { SettingsRow, SettingsRowProps } from "../component/SettingsRow";
type SettingsSection = {
  title: string;
  items: SettingsRowProps[];
};

export default function Profile() {
  const [logoutVisible, setLogoutVisible] = useState(false);

  // Reusable configuration schema for layout stability
  const settingsSections = [
    {
      title: "Account Settings",
      items: [
        {
          iconName: "person-outline",
          label: "Personal Information",
          onPress: () => {},
        },
        {
          iconName: "wallet-outline",
          label: "Payment Methods",
          valueText: "Visa ****",
          onPress: () => {},
        },
        {
          iconName: "notifications-outline",
          label: "Notifications",
          onPress: () => {},
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          iconName: "globe-outline",
          label: "Currency",
          valueText: "FCFA (XAF)",
          onPress: () => {},
        },
        {
          iconName: "shield-checkmark-outline",
          label: "Security & Privacy",
          onPress: () => {},
        },
      ],
    },
  ] satisfies SettingsSection[];

  return (
    <View className="flex-1 bg-background pb-10 px-6">
      <ScrollView
        className="flex-1 w-full"
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card Header */}
        <ProfileHeader
          name="Jean-Paul Ewane"
          email="jp.ewane@domain.cm"
          avatarInitials="JE"
          onEditAvatar={() => console.log("Edit Avatar Triggered")}
        />

        {/* Dynamic Mapping over Settings Blocks */}
        {settingsSections.map((section, idx) => (
          <View key={idx} className="mt-4">
            <Text className="text-xs font-bold tracking-wider text-muted uppercase px-1 mb-2">
              {section.title}
            </Text>
            {section.items.map((item, itemIdx) => (
              <SettingsRow key={itemIdx} {...item} />
            ))}
          </View>
        ))}

        {/* Danger/Action Isolation Zone */}
        <View className="mt-6">
          <Text className="text-xs font-bold tracking-wider text-muted uppercase px-1 mb-2">
            Session
          </Text>
          <SettingsRow
            iconName="log-out-outline"
            label="Log Out"
            isDestructive
            onPress={() => setLogoutVisible(true)}
          />
        </View>
      </ScrollView>

      {/* Contextual Confirmation Dialog Sheet */}
      <AlertModal
        visible={logoutVisible}
        type="warning"
        title="Log out of account?"
        description="You will need to re-authenticate with your email credentials to access your shared group ledgers."
        primaryActionLabel="Log Out"
        onPrimaryAction={() => console.log("Executing global session teardown")}
        onClose={() => setLogoutVisible(false)}
      />
    </View>
  );
}
