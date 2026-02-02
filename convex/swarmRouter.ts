/**
 * SWARM ROUTER
 * Central orchestration system for the Council of 4 Agents
 * Routes user actions through Alpha -> Beta -> Gamma -> Delta
 */

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const analyzeMeal = action({
    args: {
        userId: v.string(),
        photoBase64: v.string(),
        mealDescription: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const swarmStartTime = Date.now();

        try {
            console.log("🔄 SwarmRouter: Initiating Council deliberation...");

            // STEP 1: Agent Alpha - Visual Analysis
            console.log("👁️  Calling Agent Alpha (The Auditor)...");
            const alphaResponse = await ctx.runAction(api.agents.alpha.analyzeFood, {
                userId: args.userId,
                photoBase64: args.photoBase64,
            });

            const alphaAnalysis = alphaResponse.metadata;
            console.log(`✅ Alpha complete: Score ${alphaAnalysis.score}/100`);

            // STEP 2: Agent Beta - Pattern Analysis
            console.log("🧠 Calling Agent Beta (The Strategist)...");
            const mealContext = args.mealDescription || `Food with biological impact score: ${alphaAnalysis.score}`;
            const betaResponse = await ctx.runAction(api.agents.beta.analyzePatterns, {
                userId: args.userId,
                currentMealContext: mealContext,
            });

            const betaAnalysis = betaResponse.metadata;
            console.log(`✅ Beta complete: Primary cause - ${betaAnalysis.primaryCause}`);

            // STEP 3: Agent Gamma - Predictive Simulation
            console.log("🔮 Calling Agent Gamma (The Oracle)...");
            const gammaResponse = await ctx.runAction(api.agents.gamma.predictConsequences, {
                userId: args.userId,
                mealDescription: mealContext,
                alphaScore: alphaAnalysis.score,
            });

            const gammaAnalysis = gammaResponse.metadata;
            console.log(`✅ Gamma complete: ${gammaAnalysis.workoutSkipProbability}% workout skip probability`);

            // STEP 4: Agent Delta - Synthesis & Verdict
            console.log("⚔️  Calling Agent Delta (The Executioner)...");
            const deltaResponse = await ctx.runAction(api.agents.delta.synthesizeVerdict, {
                userId: args.userId,
                alphaOutput: JSON.stringify(alphaAnalysis),
                betaOutput: JSON.stringify(betaAnalysis),
                gammaOutput: JSON.stringify(gammaAnalysis),
            });

            const deltaAnalysis = deltaResponse.metadata;
            console.log(`✅ Delta complete: ${deltaAnalysis.verdict}`);

            // STEP 5: Record the meal in the database
            const mealId = await ctx.runMutation(api.mutations.meals.create, {
                userId: args.userId,
                photoBase64: args.photoBase64,
                biologicalImpactScore: alphaAnalysis.score,
                detectedIngredients: alphaAnalysis.detectedIngredients,
                hiddenOils: alphaAnalysis.hiddenOils,
                portionDensity: alphaAnalysis.portionDensity,
                predictedInsulinSpike: gammaAnalysis.insulinSpikePercent,
                predictedWorkoutSkipProbability: gammaAnalysis.workoutSkipProbability,
                approved: deltaAnalysis.verdict === "APPROVED",
                agentVerdict: deltaAnalysis.command,
            });

            // STEP 6: Update compliance score
            await ctx.runMutation(api.mutations.compliance.updateDaily, {
                userId: args.userId,
                approved: deltaAnalysis.verdict === "APPROVED",
            });

            const totalTime = Date.now() - swarmStartTime;
            console.log(`✅ SwarmRouter complete in ${totalTime}ms`);

            return {
                mealId,
                verdict: deltaAnalysis.verdict,
                command: deltaAnalysis.command,
                tone: deltaAnalysis.tone,
                consensusScore: deltaAnalysis.consensusScore,
                alphaAnalysis,
                betaAnalysis,
                gammaAnalysis,
                processingTimeMs: totalTime,
            };
        } catch (error) {
            console.error("❌ SwarmRouter error:", error);
            throw new Error(`SwarmRouter failed: ${error}`);
        }
    },
});

// Voice interrogation handler
export const handleVoiceInput = action({
    args: {
        userId: v.string(),
        transcription: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            // Get current biometrics
            const biometrics = await ctx.runQuery(api.queries.getUserHistory.getLatestBiometrics, {
                userId: args.userId,
            });

            // Use Agent Delta for voice responses (cold, professional tone)
            const { GoogleGenerativeAI } = await import("@google/generative-ai");
            const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

            if (!apiKey) {
                throw new Error("Gemini API key not configured");
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
                model: "gemini-2.0-flash-exp",
                generationConfig: {
                    temperature: 0.3,
                }
            });

            const prompt = `You are ASTRA's voice interface. The user said: "${args.transcription}"

Current biometric state: ${JSON.stringify(biometrics, null, 2)}

Respond with cold, professional precision. Examples:
- User: "I'm hungry" → "False signal. Last meal: 2 hours ago. Cortisol likely high. Drink 500ml water. Stand by."
- User: "Can I eat this?" → "Submit photo for analysis."
- User: "I feel tired" → "Sleep debt detected. Caffeine is not the solution. Rest protocol initiated."

Your response (one sentence, direct):`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const systemResponse = response.text().trim();

            // Log the interaction
            await ctx.runMutation(api.mutations.voice.log, {
                userId: args.userId,
                transcription: args.transcription,
                userIntent: "voice_query",
                systemResponse,
            });

            return {
                response: systemResponse,
                biometrics,
            };
        } catch (error) {
            console.error("Voice handler error:", error);
            throw new Error(`Voice handler failed: ${error}`);
        }
    },
});
