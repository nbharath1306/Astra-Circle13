// Gemini AI Client Configuration
// This file provides helper functions for interacting with different Gemini models

import { GoogleGenerativeAI } from "@google/generative-ai";
import Constants from "expo-constants";

// Get API key from Expo Constants (set via app.json extra or env vars)
const getApiKey = (): string => {
    const apiKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("EXPO_PUBLIC_GEMINI_API_KEY is not configured in app.json extra");
    }
    return apiKey;
};

// Initialize the Gemini API client
const getGeminiClient = () => {
    return new GoogleGenerativeAI(getApiKey());
};

// Agent Alpha: Gemini 2.0 Flash (Vision)
export const getAlphaModel = () => {
    const genAI = getGeminiClient();
    return genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
};

// Agent Beta: Gemini 2.0 Pro (Experimental)
export const getBetaModel = () => {
    const genAI = getGeminiClient();
    return genAI.getGenerativeModel({ model: "gemini-2.0-flash-thinking-exp-01-21" });
};

// Agent Gamma: Gemini 1.5 Pro
export const getGammaModel = () => {
    const genAI = getGeminiClient();
    return genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
};

// Agent Delta: Gemini 2.0 Flash (Persona-Tuned)
export const getDeltaModel = () => {
    const genAI = getGeminiClient();
    return genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
        generationConfig: {
            temperature: 0.3, // Lower temperature for more consistent, cold responses
            topP: 0.8,
            topK: 20,
        }
    });
};

// Helper function to convert base64 image to Gemini format
export const imageToGeminiPart = (base64Image: string, mimeType: string = "image/jpeg") => {
    return {
        inlineData: {
            data: base64Image,
            mimeType,
        },
    };
};

// Retry logic for API calls
export const retryWithBackoff = async <T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
): Promise<T> => {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            const delay = baseDelay * Math.pow(2, i);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error("Max retries exceeded");
};
