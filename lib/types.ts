// TypeScript Type Definitions for ASTRA

export interface BiologicalImpactAnalysis {
    score: number; // 0-100
    detectedIngredients: string[];
    hiddenOils: boolean;
    portionDensity: "low" | "medium" | "high" | "extreme";
    cheatMealPattern: boolean;
    confidence: number;
}

export interface RootCauseAnalysis {
    primaryCause: string;
    contributingFactors: string[];
    stressLevel: number;
    sleepQuality: number;
    patternDetected: string;
    recommendation: string;
}

export interface ConsequenceVector {
    insulinSpikePercent: number;
    workoutSkipProbability: number;
    energyCrashTime: string;
    nextDayImpact: string;
    weeklyTrendImpact: string;
}

export interface AgentResponse {
    agentName: "Alpha" | "Beta" | "Gamma" | "Delta";
    timestamp: number;
    processingTimeMs: number;
    output: string;
    metadata?: Record<string, any>;
}

export interface SwarmDecision {
    approved: boolean;
    verdict: string;
    alphaAnalysis: BiologicalImpactAnalysis;
    betaAnalysis: RootCauseAnalysis;
    gammaAnalysis: ConsequenceVector;
    deltaCommand: string;
    consensusScore: number;
}

export interface UserBiometrics {
    weight?: number;
    bodyFat?: number;
    sleepHours?: number;
    stressLevel?: number;
    cortisolEstimate?: number;
    lastMealTime?: number;
}

export interface MealEntry {
    userId: string;
    timestamp: number;
    photoBase64?: string;
    biologicalImpactScore?: number;
    approved: boolean;
    agentVerdict: string;
}

export interface ComplianceScore {
    userId: string;
    date: string;
    score: number;
    mealsLogged: number;
    mealsApproved: number;
    mealsRejected: number;
    shameTrigger: boolean;
}

export interface VoiceInteraction {
    userId: string;
    timestamp: number;
    transcription: string;
    userIntent: string;
    systemResponse: string;
    actionTaken?: string;
}
