/**
 * Scanner Component (formerly FoodAnalyzer)
 * High-tech visual interface for capturing meal data.
 * Features: Animated scanning line, reticle overlay, and tactical controls.
 */

import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { colors, typography, spacing, animation } from "@/constants/theme";
import { appState$, setAnalyzing, setLastVerdict } from "@/lib/store";
import { useObservable } from "@legendapp/state/react";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
    FadeIn,
    FadeOut
} from "react-native-reanimated";
import SciFiCard from "./SciFiCard";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Scanner() {
    const [modalVisible, setModalVisible] = useState(false);
    const [tempPhoto, setTempPhoto] = useState<string | null>(null);
    const analyzeMeal = useAction(api.swarmRouter.analyzeMeal);
    const isAnalyzing = useObservable(appState$.isAnalyzing);
    const user = useObservable(appState$.user);

    // Scanning Line Animation
    const scanLineY = useSharedValue(0);

    useEffect(() => {
        if (isAnalyzing.get()) {
            scanLineY.value = withRepeat(
                withTiming(200, { duration: 1500, easing: Easing.linear }),
                -1,
                false
            );
        } else {
            scanLineY.value = 0;
        }
    }, [isAnalyzing.get()]);

    const scanLineStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: scanLineY.value }],
    }));

    const pickImage = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            // In a real app we'd show a custom alert, keeping it simple for now
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1], // Square for the scanner look
            quality: 0.7,
            base64: true,
        });

        if (!result.canceled && result.assets[0].base64) {
            setTempPhoto(result.assets[0].uri);
            analyzeFood(result.assets[0].base64);
        }
    };

    const analyzeFood = async (base64Image: string) => {
        if (!user.get()) return;

        try {
            setAnalyzing(true);
            const result = await analyzeMeal({
                userId: user.get()!.userId,
                photoBase64: base64Image,
            });

            setLastVerdict(result.command);
            setAnalyzing(false);
            setTempPhoto(null); // Clear preview on success
        } catch (error) {
            setAnalyzing(false);
            setTempPhoto(null);
            console.error("Analysis failed:", error);
        }
    };

    return (
        <SciFiCard title="VISUAL CORTEX INPUT" style={styles.container}>
            <TouchableOpacity
                style={styles.scannerZone}
                onPress={pickImage}
                disabled={isAnalyzing.get()}
                activeOpacity={0.8}
            >
                {/* Background Grid/Noise (simulated with border for now) */}
                <View style={styles.gridOverlay} />

                {/* Content */}
                {isAnalyzing.get() ? (
                    <View style={styles.analyzingContainer}>
                        <Animated.View style={[styles.scanLine, scanLineStyle]} />
                        <Text style={styles.processingText}>ANALYZING BIO-DATA...</Text>
                        <Image source={{ uri: tempPhoto! }} style={styles.previewImage} />
                    </View>
                ) : (
                    <View style={styles.placeholderContainer}>
                        <View style={styles.reticle}>
                            <View style={[styles.corner, styles.tl]} />
                            <View style={[styles.corner, styles.tr]} />
                            <View style={[styles.corner, styles.bl]} />
                            <View style={[styles.corner, styles.br]} />
                        </View>
                        <Text style={styles.instructionText}>TAP TO SCAN NUTRITION</Text>
                    </View>
                )}
            </TouchableOpacity>
        </SciFiCard>
    );
}

const styles = StyleSheet.create({
    container: {
        borderStyle: 'dashed',
    },
    scannerZone: {
        height: 250,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.ui.border,
        overflow: "hidden",
    },
    gridOverlay: {
        ...StyleSheet.absoluteFillObject,
        borderWidth: 0,
        opacity: 0.1,
        // In a real app, use an SVG pattern here for "grid"
        backgroundColor: colors.background.tertiary,
    },
    placeholderContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    reticle: {
        width: 120,
        height: 120,
        position: 'relative',
        marginBottom: spacing.md,
    },
    corner: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderColor: colors.compliance.green,
        borderWidth: 2,
    },
    tl: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
    tr: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
    bl: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
    br: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },

    instructionText: {
        fontFamily: typography.fontFamily.mono,
        color: colors.compliance.green,
        fontSize: typography.fontSize.sm,
        letterSpacing: 2,
    },

    // Analyzing State
    analyzingContainer: {
        width: "100%",
        height: "100%",
        position: "relative",
    },
    previewImage: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.4,
    },
    scanLine: {
        width: "100%",
        height: 2,
        backgroundColor: colors.compliance.green,
        shadowColor: colors.compliance.green,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
        zIndex: 10,
    },
    processingText: {
        position: "absolute",
        bottom: spacing.md,
        width: "100%",
        textAlign: "center",
        color: colors.compliance.green,
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xs,
        backgroundColor: "rgba(0,0,0,0.7)",
        padding: 4,
        zIndex: 20,
    }
});
