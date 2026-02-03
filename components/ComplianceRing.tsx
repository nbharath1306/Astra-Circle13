/**
 * Compliance Ring Component
 * High-performance animated ring using React Native Skia
 * Features: Gradient glows, smooth interpolations, and terminal-like precision.
 */

import { Canvas, Path, Skia, Group, SweepGradient, BlurMask } from "@shopify/react-native-skia";
import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
import Animated, {
    useSharedValue,
    withRepeat,
    withTiming,
    Easing,
    useAnimatedStyle,
    withSpring,
    interpolateColor,
    useDerivedValue
} from "react-native-reanimated";
import { colors, typography, layout, animation, spacing } from "@/constants/theme";

interface ComplianceRingProps {
    score: number; // 0-100
}

export default function ComplianceRing({ score }: ComplianceRingProps) {
    const { size, strokeWidth, activeStrokeWidth } = layout.complianceRing;
    const center = size / 2;
    const radius = (size - activeStrokeWidth) / 2;

    // Animation values
    const progress = useSharedValue(0);
    const pulse = useSharedValue(1);

    useEffect(() => {
        progress.value = withTiming(score / 100, {
            duration: 1500,
            easing: Easing.out(Easing.exp),
        });

        pulse.value = withRepeat(
            withTiming(1.02, {
                duration: animation.duration.pulse,
                easing: Easing.inOut(Easing.ease),
            }),
            -1,
            true
        );
    }, [score]);

    // Derived colors
    const color = useDerivedValue(() => {
        if (score >= 80) return colors.compliance.green;
        if (score >= 50) return colors.compliance.amber;
        return colors.compliance.red;
    }, [score]);

    // Paths
    const backgroundPath = Skia.Path.Make();
    backgroundPath.addCircle(center, center, radius);

    // Dynamic progress path not easily doable with pure Skia Path in declarative way without a wrapper
    // So we use start/end angles
    const startAngle = -90;
    const sweepAngle = 360 * (score / 100);

    const path = Skia.Path.Make();
    path.addArc(
        { x: center - radius, y: center - radius, width: radius * 2, height: radius * 2 },
        startAngle,
        sweepAngle
    );

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pulse.value }],
    }));

    const statusText = score >= 80 ? "OPTIMAL" : score >= 50 ? "WARNING" : "CRITICAL";

    return (
        <View style={styles.container}>
            <Canvas style={{ width: size, height: size }}>
                <Group origin={{ x: center, y: center }}>
                    {/* Background Track */}
                    <Path
                        path={backgroundPath}
                        style="stroke"
                        strokeWidth={strokeWidth}
                        color={colors.ui.border}
                        opacity={0.3}
                    />

                    {/* Glowing Progress */}
                    {/* Outer Glow */}
                    <Path
                        path={path}
                        style="stroke"
                        strokeWidth={activeStrokeWidth + 4}
                        color={score >= 80 ? colors.compliance.green : score >= 50 ? colors.compliance.amber : colors.compliance.red}
                        opacity={0.2}
                        strokeCap="butt"
                    >
                        <BlurMask blur={15} style="normal" />
                    </Path>

                    {/* Inner Core */}
                    <Path
                        path={path}
                        style="stroke"
                        strokeWidth={activeStrokeWidth}
                        color={score >= 80 ? colors.compliance.green : score >= 50 ? colors.compliance.amber : colors.compliance.red}
                        strokeCap="butt"
                    />
                </Group>
            </Canvas>

            {/* Center Data */}
            <Animated.View style={[styles.centerText, animatedStyle]}>
                <Text style={styles.labelSimple}>BIO-METRIC SCORE</Text>
                <Text style={[
                    styles.scoreText,
                    { color: score >= 80 ? colors.compliance.green : score >= 50 ? colors.compliance.amber : colors.compliance.red }
                ]}>
                    {score.toFixed(0)}
                </Text>
                <Text style={[
                    styles.statusText,
                    { color: score >= 80 ? colors.compliance.green : score >= 50 ? colors.compliance.amber : colors.compliance.red }
                ]}>
                    [{statusText}]
                </Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: spacing.xl,
    },
    centerText: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    labelSimple: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xs,
        color: colors.text.tertiary,
        marginBottom: 2,
        letterSpacing: 1,
    },
    scoreText: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.display,
        fontWeight: "700",
        lineHeight: typography.fontSize.display,
        textShadowColor: "rgba(0,0,0,0.5)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    statusText: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.sm,
        fontWeight: "bold",
        letterSpacing: 2,
        marginTop: 4,
    },
});
