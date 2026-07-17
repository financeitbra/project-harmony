import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getMyProfile from "./tools/get-my-profile";
import listMyClients from "./tools/list-my-clients";
import listMyTimeEntries from "./tools/list-my-time-entries";
import createTimeEntry from "./tools/create-time-entry";

// The OAuth issuer MUST be the direct Supabase host (never the .lovable.cloud
// proxy). Build it from the project ref, which Vite inlines at build time so
// the entry stays import-safe.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "financeit-mcp",
  title: "Financeit MCP",
  version: "0.1.0",
  instructions:
    "Tools for Financeit's authenticated workspace. Use `get_my_profile` to identify the signed-in user, `list_my_clients` to see accessible clients, `list_my_time_entries` to review timesheet entries, and `create_time_entry` to log new work. All operations run as the signed-in user with row-level security enforced.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getMyProfile, listMyClients, listMyTimeEntries, createTimeEntry],
});
