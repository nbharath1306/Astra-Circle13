import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { colors, typography, spacing } from "@/constants/theme";
import { useObservable } from "@legendapp/state/react";
import { appState$ } from "@/lib/store";
import ComplianceRing from "@/components/ComplianceRing";
import FoodAnalyzer from "@/components/FoodAnalyzer";

export default function HUDScreen() {
    const user = useObservable(appState$.user);
    const compliance = useObservable(appState$.compliance);
    const biometrics = useObservable(appState$.biometrics);
    const lastVerdict = useObservable(appState$.lastVerdict);
    const isAnalyzing = useObservable(appState$.isAnalyzing);

    return (
        <ScrollView style={styles.container}>
            {/* Header Status */}
            <View style={styles.header}>
                <Text style={styles.headerText}>SYSTEM STATUS: OPERATIONAL</Text>
                <Text style={styles.subHeaderText}>
                    USER: {user.get()?.name || "UNKNOWN"}
                </Text>
            </View>

            {/* Compliance Ring */}
            <View style={styles.ringContainer}>
                <ComplianceRing score={compliance.todayScore.get()} />
            </View>

            {/* Biometric Data Display */}
            <View style={styles.dataGrid}>
                <View style={styles.dataRow}>
                    <DataPoint
                        label="COMPLIANCE"
                        value={`${compliance.todayScore.get().toFixed(0)}%`}
                        status={getComplianceStatus(compliance.todayScore.get())}
                    />
                    <DataPoint
                        label="WEEKLY AVG"
                        value={`${compliance.weeklyAverage.get().toFixed(0)}%`}
                        status={getComplianceStatus(compliance.weeklyAverage.get())}
                    />
                </View>
                <View style={styles.dataRow}>
                    <DataPoint
                        label="STRESS LVL"
                        value={biometrics.stressLevel.get()?.toString() || "N/A"}
                        status="neutral"
                    />
                    <DataPoint
                        label="SLEEP HRS"
                        value={biometrics.sleepHours.get()?.toString() || "N/A"}
                        status="neutral"
                    />
                </View>
            </View>

            {/* Last Verdict */}
            {lastVerdict.get() && (
                <View style={styles.verdictContainer}>
                    <Text style={styles.verdictLabel}>LAST DIRECTIVE:</Text>
                    <Text style={styles.verdictText}>{lastVerdict.get()}</Text>
                </View>
            )}

            {/* Food Analyzer */}
            <FoodAnalyzer />

            {/* Shame Protocol Warning */}
            {compliance.shameTrigger.get() && (
                <View style={styles.shameWarning}>
                    <Text style={styles.shameText}>
                        ⚠️ SHAME PROTOCOL ACTIVE
                    </Text>
                    <Text style={styles.shameSubtext}>
                        Compliance below 50% for 3+ days
                    </Text>
                </View>
            )}
        </ScrollView>
    );
}

// Helper component for data points
function DataPoint({
    label,
    value,
    status
}: {
    label: string;
    value: string;
    status: "optimal" | "warning" | "critical" | "neutral";
}) {
    const statusColor =
        status === "optimal" ? colors.compliance.green :
            status === "warning" ? colors.compliance.amber :
                status === "critical" ? colors.compliance.red :
                    colors.text.secondary;

    return (
        <View style={styles.dataPoint}>
            <Text style={styles.dataLabel}>{label}</Text>
            <Text style={[styles.dataValue, { color: statusColor }]}>{value}</Text>
        </View>
    );
}

function getComplianceStatus(score: number): "optimal" | "warning" | "critical" {
    if (score >= 80) return "optimal";
    if (score >= 50) return "warning";
    return "critical";
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    header: {
        padding: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.ui.border,
    },
    headerText: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.md,
        color: colors.compliance.green,
        fontWeight: typography.fontWeight.bold,
    },
    subHeaderText: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.sm,
        color: colors.text.secondary,
        marginTop: spacing.xs,
    },
    ringContainer: {
        alignItems: "center",
        paddingVertical: spacing.xl,
    },
    dataGrid: {
        padding: spacing.md,
    },
    dataRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: spacing.md,
    },
    dataPoint: {
        flex: 1,
        padding: spacing.md,
        backgroundColor: colors.background.secondary,
        borderWidth: 1,
        borderColor: colors.ui.border,
        marginHorizontal: spacing.xs,
    },
    dataLabel: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xs,
        color: colors.text.tertiary,
        marginBottom: spacing.xs,
    },
    dataValue: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
    },
    verdictContainer: {
        margin: spacing.md,
        padding: spacing.md,
        backgroundColor: colors.background.secondary,
        borderLeftWidth: 4,
        borderLeftColor: colors.compliance.green,
    },
    verdictLabel: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xs,
        color: colors.text.tertiary,
        marginBottom: spacing.xs,
    },
    verdictText: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.md,
        color: colors.text.primary,
    },
    shameWarning: {
        margin: spacing.md,
        padding: spacing.md,
        backgroundColor: colors.compliance.red,
        borderWidth: 2,
        borderColor: colors.compliance.red,
    },
    shameText: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.md,
        color: colors.background.primary,
        fontWeight: typography.fontWeight.bold,
    },
    shameSubtext: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.sm,
        color: colors.background.primary,
        marginTop: spacing.xs,
    },
});
