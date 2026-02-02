// Query: Get compliance scores and check shame trigger
import { query } from "../_generated/server";
import { v } from "convex/values";

export const getDaily = query({
    args: {
        userId: v.string(),
        date: v.string(), // YYYY-MM-DD
    },
    handler: async (ctx, args) => {
        const score = await ctx.db
            .query("complianceScores")
            .withIndex("by_date", (q) => q.eq("date", args.date))
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .first();

        return score || null;
    },
});

export const getRecent = query({
    args: {
        userId: v.string(),
        days: v.number(),
    },
    handler: async (ctx, args) => {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - args.days);
        const startDateStr = startDate.toISOString().split('T')[0];

        const scores = await ctx.db
            .query("complianceScores")
            .withIndex("by_userId", (q) => q.eq("userId", args.userId))
            .filter((q) => q.gte(q.field("date"), startDateStr))
            .order("desc")
            .collect();

        return scores;
    },
});

export const checkShameTrigger = query({
    args: {
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        const today = new Date().toISOString().split('T')[0];
        const todayScore = await ctx.db
            .query("complianceScores")
            .withIndex("by_date", (q) => q.eq("date", today))
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .first();

        return todayScore?.shameTrigger || false;
    },
});
