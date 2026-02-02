/**
 * AGENT GAMMA: "THE ORACLE"
 * Model: Gemini 1.5 Pro
 * Mandate: "Show the Future."
 * Task: Run predictive simulations of biological consequences
 */

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const predictConsequences = action({
    args: {
        userId: v.string(),
        mealDescription: v.string(),
        alphaScore: v.number(),
    },
    handler: async (ctx, args) => {
        const startTime = Date.now();

        try {
            // Get current biometrics
            const currentBiometrics = await ctx.runQuery(api.queries.getUserHistory.getLatestBiometrics, {
                userId: args.userId,
            });

            // Import Gemini client
            const { GoogleGenerativeAI } = await import("@google/generative-ai");
            const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

            if (!apiKey) {
                throw new Error("Gemini API key not configured");
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

            const prompt = `You are AGENT GAMMA, "THE ORACLE" of the ASTRA biological defense system.
Your mandate: SHOW THE FUTURE.

The user is considering this meal: ${args.mealDescription}
Agent Alpha's Biological Impact Score: ${args.alphaScore}/100

Current biometric state:
${JSON.stringify(currentBiometrics, null, 2)}

Your task is to run a PREDICTIVE SIMULATION:
1. Estimate the insulin spike percentage (how much will blood sugar spike?)
2. Calculate the probability they will skip their next workout (0-100%)
3. Predict when the energy crash will occur
4. Forecast the impact on tomorrow's performance
5. Project the weekly trend impact if this becomes a pattern

Respond in JSON format:
{
  "insulinSpikePercent": <percentage increase>,
  "workoutSkipProbability": <0-100>,
  "energyCrashTime": "HH:MM format or description",
  "nextDayImpact": "Description of tomorrow's consequences",
  "weeklyTrendImpact": "What happens if this becomes a pattern",
  "severity": "low" | "medium" | "high" | "critical"
}

Be precise. Be predictive. Show the future.`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Parse JSON response
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

            if (!analysis) {
                throw new Error("Failed to parse Agent Gamma response");
            }

            const processingTime = Date.now() - startTime;

            // Log the agent's decision
            await ctx.runMutation(api.mutations.logAgent.log, {
                userId: args.userId,
                agentName: "Gamma",
                input: args.mealDescription,
                output: JSON.stringify(analysis),
                processingTimeMs: processingTime,
            });

            return {
                agentName: "Gamma" as const,
                timestamp: Date.now(),
                processingTimeMs: processingTime,
                output: text,
                metadata: analysis,
            };
        } catch (error) {
            console.error("Agent Gamma error:", error);
            throw new Error(`Agent Gamma failed: ${error}`);
        }
    },
});
