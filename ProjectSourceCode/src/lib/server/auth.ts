import { getRequestEvent } from "$app/server";
import { redirect } from "@sveltejs/kit";

export function requireAuth() {
    const user = getRequestEvent().locals.user;
    if (!user) redirect(303, "/login");
    return user;
}