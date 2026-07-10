export { default } from "@features/auth/screens/OnboardingScreen"; // import { Logo } from "@/shared/ui/Logo";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import React from "react";
// import { Text, TouchableOpacity, View } from "react-native";

// export default function Onboarding() {
//   return (
//     <View className="flex-1 justify-between bg-background px-6 py-6">
//       {/* Navbar */}
//       <View className="flex-row justify-between items-center h-14 border-b border-border-subtle">
//         <Logo variant="horizontal" size={40} />
//         <TouchableOpacity className="w-8 h-8 items-center justify-center rounded-full border border-border">
//           <Ionicons
//             name="help-circle-outline"
//             size={20}
//             className="text-foreground-secondary"
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Hero Visual Mockup Section */}
//       <View className="items-center justify-center flex-1 my-4 relative">
//         {/* Ambient background glow mapped securely using primary theme token */}
//         <View className="absolute w-72 h-72 bg-primary/5 blur-3xl rounded-full" />

//         {/* Floating Top-Right Icon Box */}
//         <View className="absolute top-4 right-6 bg-background-secondary p-3 rounded-2xl shadow-sm border border-border-subtle z-20">
//           <Ionicons name="wallet-outline" size={24} className="text-primary" />
//         </View>

//         {/* Main Visual Container Card */}
//         <View className="w-full max-w-sm bg-background-secondary border border-border-subtle p-5 rounded-[32px] shadow-xl shadow-black/5 relative">
//           {/* Embedded Group Meeting Mockup Representation */}
//           <View className="w-full h-44 bg-ghost-surface rounded-2xl overflow-hidden justify-center items-center border border-ghost-border">
//             <Ionicons name="people-outline" size={48} className="text-muted" />
//             <Text className="text-xs text-foreground-secondary mt-2 font-medium">
//               Shared Balance Overview
//             </Text>
//           </View>

//           {/* Bottom Row inside Mockup Card */}
//           <View className="flex-row justify-between items-center mt-4">
//             {/* Stacked User Avatars */}
//             <View className="flex-row items-center">
//               <View className="w-8 h-8 rounded-full bg-muted/40 border-2 border-background-secondary" />
//               <View className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background-secondary -ml-3" />
//               <View className="w-8 h-8 rounded-full bg-muted/60 border-2 border-background-secondary -ml-3" />
//             </View>

//             {/* Status Badge */}
//             <View className="bg-primary/10 px-3 py-1.5 rounded-full">
//               <Text className="text-primary font-bold text-xs">
//                 Balance: $0.00
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* Floating Bottom-Left Activity Metric Badge */}
//         <View className="absolute bottom-10 left-4 bg-inverse-btn p-3 rounded-2xl shadow-lg z-20">
//           <Ionicons
//             name="trending-up"
//             size={20}
//             className="text-inverse-btn-text"
//           />
//         </View>
//       </View>

//       {/* Content & Value Proposition */}
//       <View className="items-center px-2 mb-8">
//         <Text className="text-[32px] font-black tracking-tight text-center text-foreground leading-10">
//           Manage group expenses{"\n"}
//           <Text className="text-primary">without the stress</Text>
//         </Text>

//         <Text className="mt-4 text-center text-foreground-secondary font-normal text-base leading-6">
//           The precision of a financial tool with the ease of a social app.
//           Settle up with roommates, friends, or partners in one click.
//         </Text>
//       </View>

//       {/* Action Buttons & Badges */}
//       <View className="w-full space-y-3">
//         {/* Primary Action Button */}
//         <TouchableOpacity
//           activeOpacity={0.9}
//           className="w-full py-4 bg-inverse-btn rounded-2xl flex-row justify-center items-center shadow-lg shadow-black/5"
//         >
//           <Text className="text-inverse-btn-text font-bold text-base mr-2">
//             Get Started
//           </Text>
//           <Ionicons
//             name="arrow-forward"
//             size={18}
//             className="text-inverse-btn-text"
//           />
//         </TouchableOpacity>

//         {/* Secondary Action Button */}
//         <TouchableOpacity
//           activeOpacity={0.7}
//           className="w-full py-4 bg-background-secondary border border-border-subtle rounded-2xl items-center justify-center"
//         >
//           <Text className="text-foreground font-bold text-base">Log In</Text>
//         </TouchableOpacity>

//         {/* Trust Elements */}
//         <View className="flex-row justify-center items-center space-x-6 pt-6 pb-2">
//           <View className="flex-row items-center space-x-1">
//             <MaterialCommunityIcons
//               name="shield-check-outline"
//               size={16}
//               className="text-muted"
//             />
//             <Text className="text-muted text-xs font-bold tracking-wider uppercase">
//               SECURE
//             </Text>
//           </View>
//           <View className="flex-row items-center space-x-1">
//             <Ionicons
//               name="people-circle-outline"
//               size={16}
//               className="text-muted"
//             />
//             <Text className="text-muted text-xs font-bold tracking-wider uppercase">
//               COLLABORATIVE
//             </Text>
//           </View>
//         </View>

//         {/* Footer Terms */}
//         <Text className="text-center text-xs text-muted font-medium">
//           By continuing, you agree to our{" "}
//           <Text className="underline text-foreground font-semibold">
//             Terms of Service
//           </Text>
//         </Text>
//       </View>
//     </View>
//   );
// }
