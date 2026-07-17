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
  name: "create_time_entry",
  title: "Create time entry",
  description:
    "Creates a new time entry for the signed-in user against one of their clients.",
  inputSchema: {
    client_id: z.string().uuid().describe("Client id (must be accessible to the user)."),
    activity_description: z.string().trim().min(1).describe("Description of the activity."),
    start_time: z.string().describe("Start timestamp in ISO 8601 format."),
    end_time: z.string().describe("End timestamp in ISO 8601 format."),
    is_extra_hours: z.boolean().describe("Whether this is extra/overtime hours.").optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ client_id, activity_description, start_time, end_time, is_extra_hours }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const { data, error } = await supabaseForUser(ctx)
      .from("time_entries")
      .insert({
        user_id: ctx.getUserId(),
        client_id,
        activity_description,
        start_time,
        end_time,
        is_extra_hours: is_extra_hours ?? false,
      })
      .select()
      .single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { entry: data },
    };
  },
});
