// Mutation: Update daily compliance score
import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const updateDaily = mutation({
    args: {
        userId: v.string(),
        approved: v.boolean(),
    },
    handler: async (ctx, args) => {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        // Find or create today's compliance record
        const existing = await ctx.db
            .query("complianceScores")
            .withIndex("by_date", (q) => q.eq("date", today))
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .first();

        if (existing) {
            // Update existing record
            const newMealsLogged = existing.mealsLogged + 1;
            const newMealsApproved = args.approved ? existing.mealsApproved + 1 : existing.mealsApproved;
            const newMealsRejected = args.approved ? existing.mealsRejected : existing.mealsRejected + 1;
            const newScore = (newMealsApproved / newMealsLogged) * 100;

            await ctx.db.patch(existing._id, {
                mealsLogged: newMealsLogged,
                mealsApproved: newMealsApproved,
                mealsRejected: newMealsRejected,
                score: newScore,
            });

            // Check for shame trigger (score < 50% for 3 days)
            await checkShameProtocol(ctx, args.userId);
        } else {
            // Create new record
            await ctx.db.insert("complianceScores", {
                userId: args.userId,
                date: today,
                score: args.approved ? 100 : 0,
                mealsLogged: 1,
                mealsApproved: args.approved ? 1 : 0,
                mealsRejected: args.approved ? 0 : 1,
                shameTrigger: false,
            });
        }
    },
});

// Helper function to check shame protocol
async function checkShameProtocol(ctx: any, userId: string) {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const threeDaysAgoStr = threeDaysAgo.toISOString().split('T')[0];

    const recentScores = await ctx.db
        .query("complianceScores")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .filter((q: any) => q.gte(q.field("date"), threeDaysAgoStr))
        .collect();

    const lowScoreDays = recentScores.filter((s: any) => s.score < 50).length;

    if (lowScoreDays >= 3) {
        // Trigger shame protocol
        const today = new Date().toISOString().split('T')[0];
        const todayScore = recentScores.find((s: any) => s.date === today);
        if (todayScore && !todayScore.shameTrigger) {
            await ctx.db.patch(todayScore._id, { shameTrigger: true });
        }
    }
}
