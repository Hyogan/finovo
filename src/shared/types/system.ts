import { Ionicons } from "@expo/vector-icons";

export type IoniconName = React.ComponentProps<typeof Ionicons>["name"];
export type AutoCapitalizeType = "none" | "sentences" | "words" | "characters";
