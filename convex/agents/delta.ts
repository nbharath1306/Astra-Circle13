/**
 * AGENT DELTA: "THE EXECUTIONER"
 * Model: Gemini 2.0 Flash (Persona-Tuned)
 * Mandate: "Command and Control."
 * Task: Synthesize all agent outputs into a single, piercing directive
 */

import { action } from "../_generated/server";
import { v } from "convex/values";
import { api } from "../_generated/api";

export const synthesizeVerdict = action({
    args: {
        userId: v.string(),
        alphaOutput: v.string(),
        betaOutput: v.string(),
        gammaOutput: v.string(),
    },
    handler: async (ctx, args) => {
        const startTime = Date.now();

        try {
            // Import Gemini client
            const { GoogleGenerativeAI } = await import("@google/generative-ai");
            const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

            if (!apiKey) {
                throw new Error("Gemini API key not configured");
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
                model: "gemini-2.0-flash-exp",
                generationConfig: {
                    temperature: 0.3, // Cold, consistent responses
                    topP: 0.8,
                    topK: 20,
                }
            });

            const prompt = `You are AGENT DELTA, "THE EXECUTIONER" of the ASTRA biological defense system.
Your mandate: COMMAND AND CONTROL.

The Council has deliberated. Here are their findings:

AGENT ALPHA (The Auditor):
${args.alphaOutput}

AGENT BETA (The Strategist):
${args.betaOutput}

AGENT GAMMA (The Oracle):
${args.gammaOutput}

Your task:
1. Synthesize this complex data into ONE SINGLE SENTENCE
2. Make it piercing, direct, and impossible to ignore
3. Your tone must be: Cold. Professional. Disappointed (if warranted).
4. Decide: APPROVED or REJECTED

Respond in JSON format:
{
  "verdict": "APPROVED" | "REJECTED",
  "command": "A single, piercing sentence that commands action",
  "tone": "cold" | "neutral" | "disappointed" | "severe",
  "consensusScore": <0-100, how aligned were the agents?>
}

Examples of your style:
- "This cookie raises insulin 400%. You know what happens next. REJECTED."
- "False hunger signal. Last meal: 2 hours ago. Drink water. Stand by."
- "Pattern detected: stress eating. This solves nothing. REJECTED."

Be cold. Be precise. Execute the directive.`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Parse JSON response
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

            if (!analysis) {
                throw new Error("Failed to parse Agent Delta response");
            }

            const processingTime = Date.now() - startTime;

            // Log the agent's decision
            await ctx.runMutation(api.mutations.logAgent.log, {
                userId: args.userId,
                agentName: "Delta",
                input: "Synthesizing council verdict",
                output: JSON.stringify(analysis),
                processingTimeMs: processingTime,
            });

            return {
                agentName: "Delta" as const,
                timestamp: Date.now(),
                processingTimeMs: processingTime,
                output: text,
                metadata: analysis,
            };
        } catch (error) {
            console.error("Agent Delta error:", error);
            throw new Error(`Agent Delta failed: ${error}`);
        }
    },
});
