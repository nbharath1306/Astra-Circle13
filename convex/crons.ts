import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// 1. MORNING BRIEFING (Daily at 7 AM UTC)
// Agents analyze sleep + yesterday's performance to set today's strategy
crons.daily(
    "morning-briefing",
    { hourUTC: 7, minuteUTC: 0 },
    internal.agents.beta.generateMorningBriefing // We will create this action
);

// 2. NIGHTLY SHAME AUDIT (Daily at 10 PM UTC)
// Checks if compliance score is below threshold and triggers shame protocol
crons.daily(
    "nightly-audit",
    { hourUTC: 22, minuteUTC: 0 },
    internal.agents.delta.nightlyAudit // We will create this action
);

export default crons;
