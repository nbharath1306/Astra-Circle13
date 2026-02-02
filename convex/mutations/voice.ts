// Mutation: Log voice interactions
import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const log = mutation({
    args: {
        userId: v.string(),
        audioUrl: v.optional(v.string()),
        transcription: v.string(),
        userIntent: v.string(),
        systemResponse: v.string(),
        actionTaken: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("voiceInteractions", {
            userId: args.userId,
            timestamp: Date.now(),
            audioUrl: args.audioUrl,
            transcription: args.transcription,
            userIntent: args.userIntent,
            systemResponse: args.systemResponse,
            actionTaken: args.actionTaken,
        });
    },
});
