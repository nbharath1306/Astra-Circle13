import { View, Text, StyleSheet, FlatList } from "react-native";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { colors, typography, spacing } from "@/constants/theme";
import { useObservable } from "@legendapp/state/react";
import { appState$ } from "@/lib/store";
import SciFiCard from "@/components/SciFiCard";

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
                <Text style={styles.subHeaderText}>LOG OF PAST DIRECTIVES</Text>
            </View>

            <FlatList
                data={meals || []}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <SciFiCard
                        title={new Date(item.timestamp).toLocaleDateString()}
                        variant={item.approved ? "default" : "critical"}
                    >
                        <View style={styles.logHeader}>
                            <Text style={[
                                styles.verdict,
                                { color: item.approved ? colors.compliance.green : colors.compliance.red }
                            ]}>
                                {item.approved ? "ACCESS GRANTED" : "ACCESS DENIED"}
                            </Text>
                            <Text style={styles.timestamp}>
                                {new Date(item.timestamp).toLocaleTimeString()}
                            </Text>
                        </View>

                        <Text style={styles.command}>
                            {"> " + item.agentVerdict}
                        </Text>

                        {item.biologicalImpactScore !== undefined && (
                            <View style={styles.scoreContainer}>
                                <Text style={styles.scoreLabel}>BIO-IMPACT:</Text>
                                <Text style={styles.scoreValue}>
                                    {item.biologicalImpactScore} / 100
                                </Text>
                            </View>
                        )}
                    </SciFiCard>
                )}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>NO DATA LOGGED</Text>
                        <Text style={styles.emptySubtext}>INITIATE SCAN PROTOCOL</Text>
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
    listContent: {
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
    logHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: spacing.sm,
    },
    verdict: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xs,
        fontWeight: "bold",
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
        marginBottom: spacing.md,
        lineHeight: 22,
    },
    scoreContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: colors.ui.border,
        paddingTop: spacing.xs,
    },
    scoreLabel: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xs,
        color: colors.text.secondary,
        marginRight: spacing.sm,
    },
    scoreValue: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.sm,
        color: colors.text.accent,
        fontWeight: "bold",
    },
    empty: {
        padding: spacing.xl,
        alignItems: "center",
        opacity: 0.5,
    },
    emptyText: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.lg,
        color: colors.text.tertiary,
        marginBottom: spacing.xs,
    },
    emptySubtext: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xs,
        color: colors.text.tertiary,
    },
});
