/**
 * AGENT BETA: "THE STRATEGIST"
 * Model: Gemini 2.0 Pro (Experimental)
 * Mandate: "Optimize the Timeline."
 * Task: Analyze 30-day historical patterns to identify root causes of failures
 */

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const analyzePatterns = action({
    args: {
        userId: v.string(),
        currentMealContext: v.string(),
    },
    handler: async (ctx, args) => {
        const startTime = Date.now();

        try {
            // Fetch user's 30-day history
            const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
            const historicalMeals = await ctx.runQuery(api.queries.getUserHistory.getMeals, {
                userId: args.userId,
                since: thirtyDaysAgo,
            });

            const biometrics = await ctx.runQuery(api.queries.getUserHistory.getBiometrics, {
                userId: args.userId,
                since: thirtyDaysAgo,
            });

            // Import Gemini client
            const { GoogleGenerativeAI } = await import("@google/generative-ai");
            const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

            if (!apiKey) {
                throw new Error("Gemini API key not configured");
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
                model: "gemini-2.0-flash-thinking-exp-01-21"
            });

            const prompt = `You are AGENT BETA, "THE STRATEGIST" of the ASTRA biological defense system.
Your mandate: OPTIMIZE THE TIMELINE.

The user is about to make a decision about: ${args.currentMealContext}

Here is their 30-day historical data:
MEALS: ${JSON.stringify(historicalMeals, null, 2)}
BIOMETRICS: ${JSON.stringify(biometrics, null, 2)}

Your task:
1. Identify patterns in their failures (rejected meals, low compliance)
2. Determine the ROOT CAUSE - Is it stress? Poor sleep? Emotional eating?
3. Analyze if the current decision fits a destructive pattern
4. Provide strategic guidance to break the cycle

Respond in JSON format:
{
  "primaryCause": "The main reason for failures",
  "contributingFactors": ["factor1", "factor2"],
  "stressLevel": <1-10 based on patterns>,
  "sleepQuality": <1-10 based on data>,
  "patternDetected": "Description of the pattern",
  "recommendation": "Strategic advice to optimize their timeline"
}

Be analytical. Be strategic. Optimize the timeline.`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Parse JSON response
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

            if (!analysis) {
                throw new Error("Failed to parse Agent Beta response");
            }

            const processingTime = Date.now() - startTime;

            // Log the agent's decision
            await ctx.runMutation(api.mutations.logAgent.log, {
                userId: args.userId,
                agentName: "Beta",
                input: args.currentMealContext,
                output: JSON.stringify(analysis),
                processingTimeMs: processingTime,
            });

            return {
                agentName: "Beta" as const,
                timestamp: Date.now(),
                processingTimeMs: processingTime,
                output: text,
                metadata: analysis,
            };
        } catch (error) {
            console.error("Agent Beta error:", error);
            throw new Error(`Agent Beta failed: ${error}`);
        }
    },
});
