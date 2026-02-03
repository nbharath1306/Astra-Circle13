"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompliance = void 0;
const server_1 = require("../server");
exports.getCompliance = (0, server_1.query)({
    args: {},
    handler: async (ctx) => {
        const compliance = await ctx.db.query("compliance").first();
        return compliance || { score: 100 };
    },
});
