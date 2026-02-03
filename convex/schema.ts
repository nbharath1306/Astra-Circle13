import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    agents: defineTable({
        name: v.string(),
        status: v.string(),
        lastActive: v.number(),
        model: v.string(),
        role: v.string(),
    }),
    logs: defineTable({
        agentId: v.optional(v.id("agents")),
        agentName: v.string(),
        content: v.string(),
        type: v.string(), // "info", "warning", "error", "command"
        timestamp: v.number(),
    }),
    compliance: defineTable({
        score: v.number(),
        lastUpdated: v.number(),
        history: v.array(
            v.object({
                score: v.number(),
                timestamp: v.number(),
                reason: v.string(),
            })
        ),
    }),
});
