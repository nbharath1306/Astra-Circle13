import { View, Text, StyleSheet, FlatList } from "react-native";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { colors, typography, spacing } from "@/constants/theme";
import { useObservable } from "@legendapp/state/react";
import { appState$ } from "@/lib/store";

export default function MissionLogScreen() {
    const user = useObservable(appState$.user);

    // Fetch recent meals (mission log entries)
    const meals = useQuery(
        api.queries.getUserHistory.getMeals,
        user.get() ? {
            userId: user.get()!.userId,
            since: Date.now() - (7 * 24 * 60 * 60 * 1000), // Last 7 days
        } : "skip"
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>COMMAND HISTORY</Text>
                <Text style={styles.subHeaderText}>Last 7 days of directives</Text>
            </View>

            <FlatList
                data={meals || []}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={[
                        styles.logEntry,
                        { borderLeftColor: item.approved ? colors.compliance.green : colors.compliance.red }
                    ]}>
                        <View style={styles.logHeader}>
                            <Text style={[
                                styles.verdict,
                                { color: item.approved ? colors.compliance.green : colors.compliance.red }
                            ]}>
                                {item.approved ? "✓ APPROVED" : "✗ REJECTED"}
                            </Text>
                            <Text style={styles.timestamp}>
                                {new Date(item.timestamp).toLocaleString()}
                            </Text>
                        </View>

                        <Text style={styles.command}>{item.agentVerdict}</Text>

                        {item.biologicalImpactScore !== undefined && (
                            <Text style={styles.score}>
                                Impact Score: {item.biologicalImpactScore}/100
                            </Text>
                        )}
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>NO MISSION DATA</Text>
                        <Text style={styles.emptySubtext}>Begin by analyzing food</Text>
                    </View>
                }
            />
        </View>
    );
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
        color: colors.text.tertiary,
        marginTop: spacing.xs,
    },
    logEntry: {
        margin: spacing.md,
        padding: spacing.md,
        backgroundColor: colors.background.secondary,
        borderLeftWidth: 4,
    },
    logHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: spacing.sm,
    },
    verdict: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.bold,
    },
    timestamp: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xs,
        color: colors.text.tertiary,
    },
    command: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.md,
        color: colors.text.primary,
        marginBottom: spacing.sm,
    },
    score: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xs,
        color: colors.text.secondary,
    },
    empty: {
        padding: spacing.xl,
        alignItems: "center",
    },
    emptyText: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.lg,
        color: colors.text.tertiary,
    },
    emptySubtext: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.sm,
        color: colors.text.tertiary,
        marginTop: spacing.xs,
    },
});
