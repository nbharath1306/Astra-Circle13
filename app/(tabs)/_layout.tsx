import { Tabs } from "expo-router";
import { colors } from "@/constants/theme";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.compliance.green,
                tabBarInactiveTintColor: colors.text.tertiary,
                tabBarStyle: {
                    backgroundColor: colors.background.primary,
                    borderTopColor: colors.ui.border,
                    borderTopWidth: 1,
                },
                headerStyle: {
                    backgroundColor: colors.background.primary,
                    borderBottomColor: colors.ui.border,
                    borderBottomWidth: 1,
                },
                headerTintColor: colors.compliance.green,
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontFamily: "Courier New",
                },
            }}
        >
            <Tabs.Screen
                name="hud"
                options={{
                    title: "HUD",
                    headerTitle: "ASTRA // BIO-METRIC HUD",
                }}
            />
            <Tabs.Screen
                name="mission-log"
                options={{
                    title: "MISSION LOG",
                    headerTitle: "ASTRA // MISSION LOG",
                }}
            />
            <Tabs.Screen
                name="analytics"
                options={{
                    title: "ANALYTICS",
                    headerTitle: "ASTRA // ANALYTICS",
                }}
            />
        </Tabs>
    );
}
