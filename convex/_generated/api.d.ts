/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as agents_alpha from "../agents/alpha.js";
import type * as agents_beta from "../agents/beta.js";
import type * as agents_delta from "../agents/delta.js";
import type * as agents_gamma from "../agents/gamma.js";
import type * as mutations_compliance from "../mutations/compliance.js";
import type * as mutations_logAgent from "../mutations/logAgent.js";
import type * as mutations_meals from "../mutations/meals.js";
import type * as mutations_voice from "../mutations/voice.js";
import type * as queries_compliance from "../queries/compliance.js";
import type * as queries_getUserHistory from "../queries/getUserHistory.js";
import type * as swarmRouter from "../swarmRouter.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "agents/alpha": typeof agents_alpha;
  "agents/beta": typeof agents_beta;
  "agents/delta": typeof agents_delta;
  "agents/gamma": typeof agents_gamma;
  "mutations/compliance": typeof mutations_compliance;
  "mutations/logAgent": typeof mutations_logAgent;
  "mutations/meals": typeof mutations_meals;
  "mutations/voice": typeof mutations_voice;
  "queries/compliance": typeof queries_compliance;
  "queries/getUserHistory": typeof queries_getUserHistory;
  swarmRouter: typeof swarmRouter;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
