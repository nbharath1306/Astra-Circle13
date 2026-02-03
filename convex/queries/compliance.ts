import { query } from '../server';

export const getCompliance = query({
    args: {},
    handler: async (ctx) => {
        const compliance = await ctx.db.query("compliance").first();
        return compliance || { score: 100 };
    },
});
