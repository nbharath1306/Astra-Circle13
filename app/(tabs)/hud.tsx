import { View, Text, StyleSheet, ScrollView, StatusBar, ImageBackground } from "react-native";
import { colors, typography, spacing } from "@/constants/theme";
import { useObservable } from "@legendapp/state/react";
import { appState$ } from "@/lib/store";
import ComplianceRing from "@/components/ComplianceRing";
import Scanner from "@/components/Scanner"; // Renamed from FoodAnalyzer
import SciFiCard from "@/components/SciFiCard";
import { LinearGradient } from "expo-linear-gradient";

// Background texture (optional, subtle noise if we had one, for now pure black + gradient)

export default function HUDScreen() {
    const user = useObservable(appState$.user);
    const compliance = useObservable(appState$.compliance);
    const biometrics = useObservable(appState$.biometrics);
    const lastVerdict = useObservable(appState$.lastVerdict);

    const userName = user.get()?.name?.toUpperCase() || "UNIT-734";
    const todayScore = compliance.todayScore.get();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Ambient Background Gradient */}
            <LinearGradient
                colors={['#000000', '#101010']}
                style={StyleSheet.absoluteFill}
            />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header Status Bar */}
                <View style={styles.topBar}>
                    <View>
                        <Text style={styles.headerLabel}>OPERATOR</Text>
                        <Text style={styles.headerValue}>{userName}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.headerLabel}>SYS.STATUS</Text>
                        <Text style={[styles.headerValue, { color: colors.compliance.green }]}>ONLINE</Text>
                    </View>
                </View>

                {/* Main Compliance Display */}
                <View style={styles.ringSection}>
                    <ComplianceRing score={todayScore} />
                </View>

                {/* Shame Protocol Warning */}
                {compliance.shameTrigger.get() && (
                    <SciFiCard title="⚠️ PROTOCOL VIOLATION" variant="critical">
                        <Text style={styles.shameText}>
                            SHAME PROTOCOL ACTIVE. SUB-OPTIMAL PERFORMANCE DETECTED.
                            IMMEDIATE RECTIFICATION REQUIRED.
                        </Text>
                    </SciFiCard>
                )}

                {/* Biometrics Grid */}
                <View style={styles.grid}>
                    <View style={styles.col}>
                        <SciFiCard title="STRESS EST.">
                            <Text style={styles.metricBig}>{biometrics.stressLevel.get() || "--"}</Text>
                            <Text style={styles.metricLabel}>CORTISOL INDEX</Text>
                        </SciFiCard>
                    </View>
                    <View style={styles.col}>
                        <SciFiCard title="SLEEP CYC.">
                            <Text style={styles.metricBig}>{biometrics.sleepHours.get() || "--"}</Text>
                            <Text style={styles.metricLabel}>HOURS LOGGED</Text>
                        </SciFiCard>
                    </View>
                </View>

                {/* Scanner Module */}
                <Scanner />

                {/* Last Directive Log */}
                <SciFiCard title="LATEST DIRECTIVE" style={{ marginTop: spacing.md }}>
                    <Text style={styles.consoleText}>
                        {lastVerdict.get() ? `> ${lastVerdict.get()}` : "> AWAITING INPUT..."}
                    </Text>
                </SciFiCard>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    scrollContent: {
        padding: spacing.md,
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.ui.border,
        paddingBottom: spacing.sm,
    },
    headerLabel: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xs,
        color: colors.text.tertiary,
        marginBottom: 2,
    },
    headerValue: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.md,
        fontWeight: "bold",
        color: colors.text.primary,
        letterSpacing: 1,
    },
    ringSection: {
        alignItems: "center",
        marginBottom: spacing.lg,
    },
    grid: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: spacing.xs,
    },
    col: {
        width: "48%",
    },
    metricBig: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xxl,
        fontWeight: "bold",
        color: colors.text.primary,
    },
    metricLabel: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.xs,
        color: colors.text.secondary,
        marginTop: 4,
    },
    shameText: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.sm,
        color: colors.compliance.red,
        fontWeight: "bold",
    },
    consoleText: {
        fontFamily: typography.fontFamily.mono,
        fontSize: typography.fontSize.md,
        color: colors.compliance.green,
        lineHeight: 24,
    }
});
