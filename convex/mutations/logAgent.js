"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInteraction = void 0;
const server_1 = require("../server");
const values_1 = require("convex/values");
exports.logInteraction = (0, server_1.mutation)({
    args: { agent: values_1.v.string(), message: values_1.v.string() },
    handler: async (ctx, args) => {
        await ctx.db.insert("logs", {
            agentName: args.agent,
            content: args.message,
            type: "interaction",
            timestamp: Date.now(),
        });
    },
});
