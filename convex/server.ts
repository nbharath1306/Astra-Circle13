import { defineTable } from "convex/server"; // Not needed here but keeping for imports
import { query as baseQuery, mutation as baseMutation, action as baseAction } from "./_generated/server";

export const query = baseQuery;
export const mutation = baseMutation;
export const action = baseAction;
