import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { colors, typography, spacing } from "@/constants/theme";

interface SciFiCardProps {
    title?: string;
    children: React.ReactNode;
    style?: ViewStyle;
    variant?: "default" | "warning" | "critical";
}

export default function SciFiCard({ title, children, style, variant = "default" }: SciFiCardProps) {
    const borderColor =
        variant === "warning" ? colors.compliance.amber :
            variant === "critical" ? colors.compliance.red :
                colors.ui.border;

    return (
        <View style={[styles.card, { borderColor }, style]}>
            {/* Corner Accents */}
            <View style={[styles.corner, styles.topLeft, { borderColor }]} />
            <View style={[styles.corner, styles.topRight, { borderColor }]} />
            <View style={[styles.corner, styles.bottomLeft, { borderColor }]} />
            <View style={[styles.corner, styles.bottomRight, { borderColor }]} />

            {/* Header */}
            {title && (
                <View style={[styles.header, { borderBottomColor: borderColor }]}>
                    <Text style={[
                        styles.title,
                        variant !== "default" && { color: borderColor }
                    ]}>
                        {title}
                    </Text>
                    <View style={[styles.headerDecoration, { backgroundColor: borderColor }]} />
                </View>
            )}

            {/* Content */}
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.background.tertiary,
        borderWidth: 1,
        marginBottom: spacing.md,
        position: "relative",
        overflow: "hidden", // Keep corners inside
    },
    content: {
        padding: spacing.md,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderBottomWidth: 1,
        backgroundColor: colors.background.secondary,
    },
    title: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xs,
        color: colors.text.secondary,
        letterSpacing: 1.5,
        fontWeight: "bold",
    },
    headerDecoration: {
        width: 4,
        height: 4,
        borderRadius: 2,
    },
    // Corner Accents (Decorative bits)
    corner: {
        position: "absolute",
        width: 8,
        height: 8,
        borderWidth: 2,
        borderColor: colors.ui.border,
        zIndex: 10,
    },
    topLeft: { top: -2, left: -2, borderBottomWidth: 0, borderRightWidth: 0 },
    topRight: { top: -2, right: -2, borderBottomWidth: 0, borderLeftWidth: 0 },
    bottomLeft: { bottom: -2, left: -2, borderTopWidth: 0, borderRightWidth: 0 },
    bottomRight: { bottom: -2, right: -2, borderTopWidth: 0, borderLeftWidth: 0 },
});
