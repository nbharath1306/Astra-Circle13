/**
 * AGENT ALPHA: "THE AUDITOR"
 * Model: Gemini 2.0 Flash (Vision)
 * Mandate: "Trust Nothing."
 * Task: Analyze food photos, detect hidden ingredients, estimate biological impact
 */

import { action } from "./_generated/server";
import { v } from "convex/values";

export const analyzeFood = action({
    args: {
        photoBase64: v.string(),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        const startTime = Date.now();

        try {
            // Import Gemini client (dynamic import for actions)
            const { GoogleGenerativeAI } = await import("@google/generative-ai");
            const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

            if (!apiKey) {
                throw new Error("Gemini API key not configured");
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

            const prompt = `You are AGENT ALPHA, "THE AUDITOR" of the ASTRA biological defense system.
Your mandate: TRUST NOTHING.

Analyze this food image with extreme scrutiny. You are looking for:
1. Hidden oils, butter, or fats (even if not visible)
2. Portion density (is this a normal serving or excessive?)
3. Processed ingredients that may not be obvious
4. Sugar content estimation
5. Whether this matches patterns of "cheat meals"

Respond in JSON format:
{
  "score": <0-100, where 0 is toxic and 100 is optimal>,
  "detectedIngredients": ["ingredient1", "ingredient2"],
  "hiddenOils": <true/false>,
  "portionDensity": "low" | "medium" | "high" | "extreme",
  "cheatMealPattern": <true/false>,
  "confidence": <0-100>,
  "reasoning": "Brief explanation of your assessment"
}

Be harsh. Be precise. Trust nothing.`;

            const imagePart = {
                inlineData: {
                    data: args.photoBase64,
                    mimeType: "image/jpeg",
                },
            };

            const result = await model.generateContent([prompt, imagePart]);
            const response = await result.response;
            const text = response.text();

            // Parse JSON response
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

            if (!analysis) {
                throw new Error("Failed to parse Agent Alpha response");
            }

            const processingTime = Date.now() - startTime;

            // Log the agent's decision
            await ctx.runMutation(api.mutations.logAgent.log, {
                userId: args.userId,
                agentName: "Alpha",
                input: "Food photo analysis",
                output: JSON.stringify(analysis),
                processingTimeMs: processingTime,
            });

            return {
                agentName: "Alpha" as const,
                timestamp: Date.now(),
                processingTimeMs: processingTime,
                output: text,
                metadata: analysis,
            };
        } catch (error) {
            console.error("Agent Alpha error:", error);
            throw new Error(`Agent Alpha failed: ${error}`);
        }
    },
});

// Import API for internal use
import { api } from "./_generated/api";
