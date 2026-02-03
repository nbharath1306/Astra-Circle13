/**
 * Shared types for ASTRA Convex functions
 * These break circular type references in action chaining
 */

// Alpha agent response (food analysis)
export interface AlphaAnalysis {
    score: number;
    detectedIngredients: string[];
    hiddenOils: boolean;
    portionDensity: "low" | "medium" | "high" | "extreme";
    cheatMealPattern: boolean;
    confidence: number;
    reasoning: string;
}

export interface AlphaResponse {
    agentName: "Alpha";
    timestamp: number;
    processingTimeMs: number;
    output: string;
    metadata: AlphaAnalysis;
}

// Beta agent response (pattern analysis)
export interface BetaAnalysis {
    primaryCause: string;
    patternStrength: string;
    correlatedBehaviors: string[];
    predictedCycle: string;
    vulnerabilityPeriod: string;
    reasoning: string;
}

export interface BetaResponse {
    agentName: "Beta";
    timestamp: number;
    processingTimeMs: number;
    output: string;
    metadata: BetaAnalysis;
}

// Gamma agent response (prediction)
export interface GammaAnalysis {
    insulinSpikePercent: number;
    workoutSkipProbability: number;
    craveTriggerHoursLater: number;
    energyCrashTime: string;
    rippleEffects: string[];
    reasoning: string;
}

export interface GammaResponse {
    agentName: "Gamma";
    timestamp: number;
    processingTimeMs: number;
    output: string;
    metadata: GammaAnalysis;
}

// Delta agent response (verdict)
export interface DeltaAnalysis {
    verdict: "APPROVED" | "DENIED" | "CONDITIONAL";
    command: string;
    tone: string;
    consensusScore: number;
    dissent: string | null;
    reasoning: string;
}

export interface DeltaResponse {
    agentName: "Delta";
    timestamp: number;
    processingTimeMs: number;
    output: string;
    metadata: DeltaAnalysis;
}

// Biometrics data structure
export interface BiometricsData {
    userId: string;
    steps?: number;
    heartRate?: number;
    sleep?: number;
    lastMealTime?: number;
}
