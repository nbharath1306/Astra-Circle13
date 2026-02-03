import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { colors, typography, spacing } from "@/constants/theme";
import { useObservable } from "@legendapp/state/react";
import { appState$ } from "@/lib/store";

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

    const averageScore = complianceScores
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
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>7-DAY PERFORMANCE ANALYSIS</Text>
            </View>

            {/* Summary Stats */}
            <View style={styles.statsGrid}>
                <StatCard
                    label="AVG COMPLIANCE"
                    value={`${averageScore.toFixed(1)}%`}
                    status={getStatus(averageScore)}
                />
                <StatCard
                    label="TOTAL MEALS"
                    value={totalMeals.toString()}
                    status="neutral"
                />
                <StatCard
                    label="APPROVED"
                    value={totalApproved.toString()}
                    status="optimal"
                />
                <StatCard
                    label="REJECTED"
                    value={totalRejected.toString()}
                    status="critical"
                />
            </View>

            {/* Daily Breakdown */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>DAILY BREAKDOWN</Text>
                {complianceScores?.map((day: { date: string; score: number; mealsApproved: number; mealsLogged: number }) => (
                    <View key={day.date} style={styles.dayRow}>
                        <Text style={styles.date}>{day.date}</Text>
                        <View style={styles.dayStats}>
                            <Text style={[
                                styles.dayScore,
                                { color: getStatusColor(day.score) }
                            ]}>
                                {day.score.toFixed(0)}%
                            </Text>
                            <Text style={styles.dayMeals}>
                                {day.mealsApproved}/{day.mealsLogged} meals
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

function StatCard({
    label,
    value,
    status
}: {
    label: string;
    value: string;
    status: "optimal" | "warning" | "critical" | "neutral";
}) {
    const statusColor = getStatusColor(
        status === "optimal" ? 90 :
            status === "warning" ? 60 :
                status === "critical" ? 30 : 50
    );

    return (
        <View style={styles.statCard}>
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={[styles.statValue, { color: statusColor }]}>{value}</Text>
        </View>
    );
}

function getStatus(score: number): "optimal" | "warning" | "critical" {
    if (score >= 80) return "optimal";
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
    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: spacing.md,
    },
    statCard: {
        width: "48%",
        padding: spacing.md,
        margin: "1%",
        backgroundColor: colors.background.secondary,
        borderWidth: 1,
        borderColor: colors.ui.border,
    },
    statLabel: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xs,
        color: colors.text.tertiary,
        marginBottom: spacing.xs,
    },
    statValue: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
    },
    section: {
        padding: spacing.md,
    },
    sectionTitle: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.sm,
        color: colors.text.tertiary,
        marginBottom: spacing.md,
    },
    dayRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: spacing.md,
        backgroundColor: colors.background.secondary,
        borderWidth: 1,
        borderColor: colors.ui.border,
        marginBottom: spacing.sm,
    },
    date: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.sm,
        color: colors.text.secondary,
    },
    dayStats: {
        alignItems: "flex-end",
    },
    dayScore: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.bold,
    },
    dayMeals: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xs,
        color: colors.text.tertiary,
        marginTop: spacing.xs,
    },
});
