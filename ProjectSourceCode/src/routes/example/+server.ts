import { db } from '#lib/db.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    return Response.json(await db.one("SELECT COUNT(*) FROM users;"));
};
