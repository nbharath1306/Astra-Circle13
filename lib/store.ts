// Legend-State global store configuration
import { observable } from "@legendapp/state";

export interface UserState {
    userId: string;
    name: string;
    email?: string;
}

export interface BiometricsState {
    weight?: number;
    bodyFat?: number;
    sleepHours?: number;
    stressLevel?: number;
    lastMealTime?: number;
}

export interface ComplianceState {
    todayScore: number;
    weeklyAverage: number;
    shameTrigger: boolean;
}

export interface AppState {
    user: UserState | null;
    biometrics: BiometricsState;
    compliance: ComplianceState;
    isAnalyzing: boolean;
    lastVerdict: string | null;
}

// Create observable state
export const appState$ = observable<AppState>({
    user: null,
    biometrics: {},
    compliance: {
        todayScore: 100,
        weeklyAverage: 100,
        shameTrigger: false,
    },
    isAnalyzing: false,
    lastVerdict: null,
});

// Helper functions
export const setUser = (user: UserState) => {
    appState$.user.set(user);
};

export const updateBiometrics = (biometrics: Partial<BiometricsState>) => {
    appState$.biometrics.assign(biometrics);
};

export const updateCompliance = (compliance: Partial<ComplianceState>) => {
    appState$.compliance.assign(compliance);
};

export const setAnalyzing = (isAnalyzing: boolean) => {
    appState$.isAnalyzing.set(isAnalyzing);
};

export const setLastVerdict = (verdict: string) => {
    appState$.lastVerdict.set(verdict);
};
