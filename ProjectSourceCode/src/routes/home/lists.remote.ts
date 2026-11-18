import { requireAuth } from "#lib/server/auth.ts";
import { query } from "$app/server";

export const getLists = query(() => {
    const user = requireAuth();
});