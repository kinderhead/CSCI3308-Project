import { db } from '#lib/server/db.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
    return Response.json({
        query: event.url.searchParams.get("query"),
        db: await db.one("SELECT COUNT(*) FROM users;")
    });
};
