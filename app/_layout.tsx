import { Stack } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import Constants from "expo-constants";

// Initialize Convex client
const convex = new ConvexReactClient(
    Constants.expoConfig?.extra?.EXPO_PUBLIC_CONVEX_URL || ""
);

export default function RootLayout() {
    return (
        <ConvexProvider client={convex}>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#000000",
                    },
                    headerTintColor: "#00FF41",
                    headerTitleStyle: {
                        fontWeight: "bold",
                        fontFamily: "Courier New",
                    },
                    contentStyle: {
                        backgroundColor: "#000000",
                    },
                }}
            >
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerShown: false
                    }}
                />
            </Stack>
        </ConvexProvider>
    );
}
