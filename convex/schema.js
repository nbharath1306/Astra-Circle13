"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("convex/server");
const values_1 = require("convex/values");
exports.default = (0, server_1.defineSchema)({
    agents: (0, server_1.defineTable)({
        name: values_1.v.string(),
        status: values_1.v.string(),
        lastActive: values_1.v.number(),
        model: values_1.v.string(),
        role: values_1.v.string(),
    }),
    logs: (0, server_1.defineTable)({
        agentId: values_1.v.optional(values_1.v.id("agents")),
        agentName: values_1.v.string(),
        content: values_1.v.string(),
        type: values_1.v.string(), // "info", "warning", "error", "command"
        timestamp: values_1.v.number(),
    }),
    compliance: (0, server_1.defineTable)({
        score: values_1.v.number(),
        lastUpdated: values_1.v.number(),
        history: values_1.v.array(values_1.v.object({
            score: values_1.v.number(),
            timestamp: values_1.v.number(),
            reason: values_1.v.string(),
        })),
    }),
});
