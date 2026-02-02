/**
 * Compliance Ring Component
 * High-performance animated ring using React Native Skia
 * Color transitions: Green (optimal) -> Amber (warning) -> Red (critical)
 */

import { Canvas, Circle, Group, Paint, Skia } from "@shopify/react-native-skia";
import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useSharedValue, withRepeat, withTiming, Easing } from "react-native-reanimated";
import { colors, typography, layout } from "@/constants/theme";

interface ComplianceRingProps {
    score: number; // 0-100
}

export default function ComplianceRing({ score }: ComplianceRingProps) {
    const { size, strokeWidth } = layout.complianceRing;
    const radius = (size - strokeWidth) / 2;
    const center = size / 2;

    // Determine color based on score
    const getColor = (score: number) => {
        if (score >= 80) return colors.compliance.green;
        if (score >= 50) return colors.compliance.amber;
        return colors.compliance.red;
    };

    const ringColor = getColor(score);
    const progress = score / 100;

    // Pulse animation
    const pulse = useSharedValue(1);

    useEffect(() => {
        pulse.value = withRepeat(
            withTiming(1.1, {
                duration: layout.complianceRing.pulseSpeed,
                easing: Easing.inOut(Easing.ease),
            }),
            -1,
            true
        );
    }, []);

    return (
        <View style={styles.container}>
            <Canvas style={{ width: size, height: size }}>
                <Group>
                    {/* Background ring */}
                    <Circle
                        cx={center}
                        cy={center}
                        r={radius}
                        style="stroke"
                        strokeWidth={strokeWidth}
                        color={colors.ui.border}
                    />

                    {/* Progress ring */}
                    <Circle
                        cx={center}
                        cy={center}
                        r={radius}
                        style="stroke"
                        strokeWidth={strokeWidth}
                        color={ringColor}
                        start={0}
                        end={progress}
                    />
                </Group>
            </Canvas>

            {/* Center text */}
            <View style={styles.centerText}>
                <Text style={[styles.scoreText, { color: ringColor }]}>
                    {score.toFixed(0)}%
                </Text>
                <Text style={styles.labelText}>COMPLIANCE</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
    centerText: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    scoreText: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xxxl,
        fontWeight: typography.fontWeight.bold,
    },
    labelText: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xs,
        color: colors.text.tertiary,
        marginTop: 4,
    },
});
