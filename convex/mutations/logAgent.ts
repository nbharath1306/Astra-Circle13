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

export const logBriefing = mutation({
    args: {
        userId: v.string(),
        strategy: v.string(),
        focusArea: v.string(),
        date: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("dailyBriefings", {
            userId: args.userId,
            timestamp: Date.now(),
            date: args.date,
            strategy: args.strategy,
            focusArea: args.focusArea,
            read: false,
        });
    },
});

export const logNotification = mutation({
    args: {
        userId: v.string(),
        title: v.string(),
        body: v.string(),
        type: v.union(v.literal("info"), v.literal("warning"), v.literal("critical")),
        actionSchema: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("notifications", {
            userId: args.userId,
            timestamp: Date.now(),
            title: args.title,
            body: args.body,
            type: args.type,
            read: false,
            actionSchema: args.actionSchema,
        });
    },
});
