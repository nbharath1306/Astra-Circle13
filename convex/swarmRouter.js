"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeTask = void 0;
const server_1 = require("./server");
const values_1 = require("convex/values");
exports.routeTask = (0, server_1.mutation)({
    args: { task: values_1.v.string(), imageData: values_1.v.optional(values_1.v.string()) },
    handler: async (ctx, args) => {
        // Router logic: Decide which agent to call
        // For now, just log it
        await ctx.db.insert("logs", {
            agentName: "SwarmRouter",
            content: `Received task: ${args.task}`,
            type: "info",
            timestamp: Date.now(),
        });
        return { status: "routed", target: "Alpha" };
    },
});
