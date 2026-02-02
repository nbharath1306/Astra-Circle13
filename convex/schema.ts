import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // User profiles and biometric data
    users: defineTable({
        userId: v.string(),
        name: v.string(),
        email: v.optional(v.string()),
        createdAt: v.number(),
        // Biometric baselines
        baselineWeight: v.optional(v.number()),
        targetWeight: v.optional(v.number()),
        height: v.optional(v.number()),
        age: v.optional(v.number()),
    }).index("by_userId", ["userId"]),

    // Meal entries with photo analysis
    meals: defineTable({
        userId: v.string(),
        timestamp: v.number(),
        photoUrl: v.optional(v.string()),
        photoBase64: v.optional(v.string()),
        // Agent Alpha outputs
        biologicalImpactScore: v.optional(v.number()), // 0-100
        detectedIngredients: v.optional(v.array(v.string())),
        hiddenOils: v.optional(v.boolean()),
        portionDensity: v.optional(v.string()),
        // Agent Gamma predictions
        predictedInsulinSpike: v.optional(v.number()),
        predictedWorkoutSkipProbability: v.optional(v.number()),
        // Final verdict
        approved: v.boolean(),
        agentVerdict: v.string(),
    })
        .index("by_userId", ["userId"])
        .index("by_timestamp", ["timestamp"]),

    // Real-time biometric tracking
    biometrics: defineTable({
        userId: v.string(),
        timestamp: v.number(),
        weight: v.optional(v.number()),
        bodyFat: v.optional(v.number()),
        sleepHours: v.optional(v.number()),
        stressLevel: v.optional(v.number()), // 1-10
        cortisolEstimate: v.optional(v.number()),
        lastMealTime: v.optional(v.number()),
    })
        .index("by_userId", ["userId"])
        .index("by_timestamp", ["timestamp"]),

    // Compliance scoring (daily)
    complianceScores: defineTable({
        userId: v.string(),
        date: v.string(), // YYYY-MM-DD
        score: v.number(), // 0-100
        mealsLogged: v.number(),
        mealsApproved: v.number(),
        mealsRejected: v.number(),
        shameTrigger: v.boolean(), // If score < 50% for 3 days
    })
        .index("by_userId", ["userId"])
        .index("by_date", ["date"]),

    // Agent decision logs (for debugging and historical analysis)
    agentLogs: defineTable({
        userId: v.string(),
        timestamp: v.number(),
        mealId: v.optional(v.id("meals")),
        agentName: v.string(), // "Alpha", "Beta", "Gamma", "Delta"
        input: v.string(),
        output: v.string(),
        processingTimeMs: v.number(),
    })
        .index("by_userId", ["userId"])
        .index("by_timestamp", ["timestamp"])
        .index("by_agent", ["agentName"]),

    // Voice interrogation logs
    voiceInteractions: defineTable({
        userId: v.string(),
        timestamp: v.number(),
        audioUrl: v.optional(v.string()),
        transcription: v.string(),
        userIntent: v.string(),
        systemResponse: v.string(),
        actionTaken: v.optional(v.string()),
    })
        .index("by_userId", ["userId"])
        .index("by_timestamp", ["timestamp"]),
});
