// Mutation: Log agent decisions
import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const log = mutation({
    args: {
        userId: v.string(),
        mealId: v.optional(v.id("meals")),
        agentName: v.string(),
        input: v.string(),
        output: v.string(),
        processingTimeMs: v.number(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("agentLogs", {
            userId: args.userId,
            timestamp: Date.now(),
            mealId: args.mealId,
            agentName: args.agentName,
            input: args.input,
            output: args.output,
            processingTimeMs: args.processingTimeMs,
        });
    },
});
