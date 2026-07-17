import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "list_my_time_entries",
  title: "List my time entries",
  description:
    "Lists the signed-in user's time entries, most recent first. Admins see every user's entries.",
  inputSchema: {
    limit: z
      .number()
      .int()
      .positive()
      .describe("Maximum number of entries to return (default 50).")
      .optional(),
    client_id: z.string().uuid().describe("Optional client id filter.").optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit, client_id }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    let query = supabaseForUser(ctx)
      .from("time_entries")
      .select(
        "id, user_id, client_id, activity_description, start_time, end_time, is_extra_hours, created_at",
      )
      .order("start_time", { ascending: false })
      .limit(limit ?? 50);
    if (client_id) query = query.eq("client_id", client_id);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { entries: data ?? [] },
    };
  },
});
