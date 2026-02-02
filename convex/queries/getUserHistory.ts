// Query: Get user's historical meal data
import { query } from "../_generated/server";
import { v } from "convex/values";

export const getMeals = query({
    args: {
        userId: v.string(),
        since: v.number(), // timestamp
    },
    handler: async (ctx, args) => {
        const meals = await ctx.db
            .query("meals")
            .withIndex("by_userId", (q) => q.eq("userId", args.userId))
            .filter((q) => q.gte(q.field("timestamp"), args.since))
            .order("desc")
            .collect();

        return meals;
    },
});

export const getBiometrics = query({
    args: {
        userId: v.string(),
        since: v.number(),
    },
    handler: async (ctx, args) => {
        const biometrics = await ctx.db
            .query("biometrics")
            .withIndex("by_userId", (q) => q.eq("userId", args.userId))
            .filter((q) => q.gte(q.field("timestamp"), args.since))
            .order("desc")
            .collect();

        return biometrics;
    },
});

export const getLatestBiometrics = query({
    args: {
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        const latest = await ctx.db
            .query("biometrics")
            .withIndex("by_userId", (q) => q.eq("userId", args.userId))
            .order("desc")
            .first();

        return latest || null;
    },
});
