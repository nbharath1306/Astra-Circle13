/**
 * Compliance Ring Component
 * High-performance animated ring using React Native Skia
 * Color transitions: Green (optimal) -> Amber (warning) -> Red (critical)
 */

import { Canvas, Path, Skia, Group } from "@shopify/react-native-skia";
import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
import Animated, {
    useSharedValue,
    withRepeat,
    withTiming,
    Easing,
    useAnimatedStyle,
} from "react-native-reanimated";
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

    // Create arc path for progress ring
    const createArcPath = (progressValue: number) => {
        const path = Skia.Path.Make();
        const startAngle = -90; // Start from top
        const sweepAngle = 360 * progressValue;

        path.addArc(
            { x: center - radius, y: center - radius, width: radius * 2, height: radius * 2 },
            startAngle,
            sweepAngle
        );

        return path;
    };

    const backgroundPath = createArcPath(1);
    const progressPath = createArcPath(progress);

    // Pulse animation for center text
    const pulse = useSharedValue(1);

    useEffect(() => {
        pulse.value = withRepeat(
            withTiming(1.05, {
                duration: layout.complianceRing.pulseSpeed,
                easing: Easing.inOut(Easing.ease),
            }),
            -1,
            true
        );
    }, [pulse]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pulse.value }],
    }));

    return (
        <View style={styles.container}>
            <Canvas style={{ width: size, height: size }}>
                <Group>
                    {/* Background ring */}
                    <Path
                        path={backgroundPath}
                        style="stroke"
                        strokeWidth={strokeWidth}
                        color={colors.ui.border}
                        strokeCap="round"
                    />

                    {/* Progress ring */}
                    <Path
                        path={progressPath}
                        style="stroke"
                        strokeWidth={strokeWidth}
                        color={ringColor}
                        strokeCap="round"
                    />
                </Group>
            </Canvas>

            {/* Center text */}
            <Animated.View style={[styles.centerText, animatedStyle]}>
                <Text style={[styles.scoreText, { color: ringColor }]}>
                    {score.toFixed(0)}%
                </Text>
                <Text style={styles.labelText}>COMPLIANCE</Text>
            </Animated.View>
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
