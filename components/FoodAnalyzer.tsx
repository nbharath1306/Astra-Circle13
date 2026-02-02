/**
 * Food Analyzer Component
 * Camera integration for food photo analysis
 * Triggers Agent Alpha through SwarmRouter
 */

import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { colors, typography, spacing } from "@/constants/theme";
import { appState$, setAnalyzing, setLastVerdict } from "@/lib/store";
import { useObservable } from "@legendapp/state/react";

export default function FoodAnalyzer() {
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const analyzeMeal = useAction(api.swarmRouter.analyzeMeal);
    const isAnalyzing = useObservable(appState$.isAnalyzing);
    const user = useObservable(appState$.user);

    const pickImage = async () => {
        // Request permissions
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission Required", "Camera permission is required to analyze food.");
            return;
        }

        // Launch camera
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
            base64: true,
        });

        if (!result.canceled && result.assets[0].base64) {
            setPhotoUri(result.assets[0].uri);
            await analyzeFood(result.assets[0].base64);
        }
    };

    const analyzeFood = async (base64Image: string) => {
        if (!user.get()) {
            Alert.alert("Error", "User not initialized");
            return;
        }

        try {
            setAnalyzing(true);

            const result = await analyzeMeal({
                userId: user.get()!.userId,
                photoBase64: base64Image,
            });

            setLastVerdict(result.command);
            setAnalyzing(false);

            // Show verdict
            Alert.alert(
                result.verdict,
                result.command,
                [{ text: "ACKNOWLEDGED", style: "default" }]
            );
        } catch (error) {
            setAnalyzing(false);
            Alert.alert("Analysis Failed", `Error: ${error}`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>FOOD ANALYSIS</Text>

            <TouchableOpacity
                style={styles.cameraButton}
                onPress={pickImage}
                disabled={isAnalyzing.get()}
            >
                <Text style={styles.buttonText}>
                    {isAnalyzing.get() ? "ANALYZING..." : "CAPTURE FOOD"}
                </Text>
            </TouchableOpacity>

            {isAnalyzing.get() && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.compliance.green} />
                    <Text style={styles.loadingText}>
                        Council deliberating...
                    </Text>
                </View>
            )}

            {photoUri && !isAnalyzing.get() && (
                <Image source={{ uri: photoUri }} style={styles.preview} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: spacing.md,
        padding: spacing.md,
        backgroundColor: colors.background.secondary,
        borderWidth: 1,
        borderColor: colors.ui.border,
    },
    title: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.sm,
        color: colors.text.tertiary,
        marginBottom: spacing.md,
    },
    cameraButton: {
        backgroundColor: colors.compliance.green,
        padding: spacing.md,
        alignItems: "center",
        borderWidth: 2,
        borderColor: colors.compliance.green,
    },
    buttonText: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.md,
        color: colors.background.primary,
        fontWeight: typography.fontWeight.bold,
    },
    loadingContainer: {
        marginTop: spacing.md,
        alignItems: "center",
    },
    loadingText: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.sm,
        color: colors.text.secondary,
        marginTop: spacing.sm,
    },
    preview: {
        width: "100%",
        height: 200,
        marginTop: spacing.md,
        borderWidth: 1,
        borderColor: colors.ui.border,
    },
});
