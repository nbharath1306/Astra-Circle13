import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { colors, typography, spacing } from "@/constants/theme";
import { useObservable } from "@legendapp/state/react";
import { appState$ } from "@/lib/store";
import SciFiCard from "@/components/SciFiCard";

export default function AnalyticsScreen() {
    const user = useObservable(appState$.user);

    // Fetch 7-day compliance data
    const complianceScores = useQuery(
        api.queries.compliance.getRecent,
        user.get() ? {
            userId: user.get()!.userId,
            days: 7,
        } : "skip"
    );

    const averageScore = complianceScores && complianceScores.length > 0
        ? complianceScores.reduce((sum: number, s: { score: number }) => sum + s.score, 0) / complianceScores.length
        : 0;

    const totalMeals = complianceScores
        ? complianceScores.reduce((sum: number, s: { mealsLogged: number }) => sum + s.mealsLogged, 0)
        : 0;

    const totalApproved = complianceScores
        ? complianceScores.reduce((sum: number, s: { mealsApproved: number }) => sum + s.mealsApproved, 0)
        : 0;

    const totalRejected = complianceScores
        ? complianceScores.reduce((sum: number, s: { mealsRejected: number }) => sum + s.mealsRejected, 0)
        : 0;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>PERFORMANCE ANALYSIS</Text>
                <Text style={styles.subHeaderText}>T-MINUS 7 DAY REPORT</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Summary Stats */}
                <View style={styles.statsGrid}>
                    <View style={styles.col}>
                        <SciFiCard title="AVG COMPLIANCE" variant={getStatus(averageScore)}>
                            <Text style={[styles.statValue, { color: getStatusColor(averageScore) }]}>
                                {averageScore.toFixed(1)}%
                            </Text>
                        </SciFiCard>
                        <SciFiCard title="TOTAL INPUTS">
                            <Text style={styles.statValue}>{totalMeals}</Text>
                        </SciFiCard>
                    </View>
                    <View style={styles.col}>
                        <SciFiCard title="APPROVED" variant="default">
                            <Text style={[styles.statValue, { color: colors.compliance.green }]}>
                                {totalApproved}
                            </Text>
                        </SciFiCard>
                        <SciFiCard title="REJECTED" variant="critical">
                            <Text style={[styles.statValue, { color: colors.compliance.red }]}>
                                {totalRejected}
                            </Text>
                        </SciFiCard>
                    </View>
                </View>

                {/* Daily Breakdown */}
                <Text style={styles.sectionTitle}>TEMPORAL LOG</Text>

                {complianceScores?.map((day: { date: string; score: number; mealsApproved: number; mealsLogged: number }) => (
                    <SciFiCard key={day.date} style={styles.dayCard}>
                        <View style={styles.dayRow}>
                            <View>
                                <Text style={styles.date}>{day.date}</Text>
                                <Text style={styles.dayMeals}>
                                    LOGGED: {day.mealsLogged} | OK: {day.mealsApproved}
                                </Text>
                            </View>
                            <View style={styles.dayStats}>
                                <Text style={[
                                    styles.dayScore,
                                    { color: getStatusColor(day.score) }
                                ]}>
                                    {day.score.toFixed(0)}%
                                </Text>
                            </View>
                        </View>
                    </SciFiCard>
                ))}
            </ScrollView>
        </View>
    );
}

function getStatus(score: number): "default" | "warning" | "critical" {
    if (score >= 80) return "default"; // Green is default border
    if (score >= 50) return "warning";
    return "critical";
}

function getStatusColor(score: number): string {
    if (score >= 80) return colors.compliance.green;
    if (score >= 50) return colors.compliance.amber;
    return colors.compliance.red;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    scrollContent: {
        padding: spacing.md,
    },
    header: {
        padding: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.ui.border,
        backgroundColor: colors.background.secondary,
    },
    headerText: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.md,
        color: colors.compliance.green,
        fontWeight: "bold",
        letterSpacing: 2,
    },
    subHeaderText: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xs,
        color: colors.text.tertiary,
        marginTop: 2,
    },
    statsGrid: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: spacing.lg,
    },
    col: {
        width: "48%",
    },
    statValue: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xxl,
        fontWeight: "bold",
        color: colors.text.primary,
    },
    sectionTitle: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xs,
        color: colors.text.tertiary,
        marginBottom: spacing.md,
        letterSpacing: 2,
    },
    dayCard: {
        marginBottom: spacing.sm,
    },
    dayRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    date: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.sm,
        color: colors.text.primary,
        fontWeight: "bold",
    },
    dayMeals: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xs,
        color: colors.text.tertiary,
        marginTop: 4,
    },
    dayStats: {
        alignItems: "flex-end",
    },
    dayScore: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.lg,
        fontWeight: "bold",
    },
});
