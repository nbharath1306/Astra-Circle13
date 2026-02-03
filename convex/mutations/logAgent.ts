import { mutation } from "../server";
import { v } from "convex/values";

export const logInteraction = mutation({
    args: { agent: v.string(), message: v.string() },
    handler: async (ctx, args) => {
        await ctx.db.insert("logs", {
            agentName: args.agent,
            content: args.message,
            type: "interaction",
            timestamp: Date.now(),
        });
    },
});
