import { db } from '#lib/server/db.js';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    if ((await db.query("SELECT * FROM lists WHERE list_id = $1;", [params.id])).length == 0) {
        console.log(`Creating new list with id ${params.id}`);
        await db.query("INSERT INTO lists (list_id, name, items) VALUES ($1, 'New List', '{}');", [params.id]);
    }

    return {};
}) satisfies PageServerLoad;