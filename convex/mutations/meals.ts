// Mutation: Create meal entry
import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const create = mutation({
    args: {
        userId: v.string(),
        photoBase64: v.optional(v.string()),
        biologicalImpactScore: v.optional(v.number()),
        detectedIngredients: v.optional(v.array(v.string())),
        hiddenOils: v.optional(v.boolean()),
        portionDensity: v.optional(v.string()),
        predictedInsulinSpike: v.optional(v.number()),
        predictedWorkoutSkipProbability: v.optional(v.number()),
        approved: v.boolean(),
        agentVerdict: v.string(),
    },
    handler: async (ctx, args) => {
        const mealId = await ctx.db.insert("meals", {
            userId: args.userId,
            timestamp: Date.now(),
            photoBase64: args.photoBase64,
            biologicalImpactScore: args.biologicalImpactScore,
            detectedIngredients: args.detectedIngredients,
            hiddenOils: args.hiddenOils,
            portionDensity: args.portionDensity,
            predictedInsulinSpike: args.predictedInsulinSpike,
            predictedWorkoutSkipProbability: args.predictedWorkoutSkipProbability,
            approved: args.approved,
            agentVerdict: args.agentVerdict,
        });

        return mealId;
    },
});
