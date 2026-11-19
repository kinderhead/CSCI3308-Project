import { requireAuth } from "#lib/server/auth.ts";
import { db } from "#lib/server/db.js";
import { command, query } from "$app/server";

export const getLists = query(async () => {
    const user = requireAuth();
    const lists = await db.query("SELECT lists.list_id, lists.name FROM users_to_lists INNER JOIN lists ON lists.list_id = users_to_lists.list_id WHERE users_to_lists.email = $1;", [user.email]);
    return lists as { list_id: number, name: string}[];
});

export const createList = command(async () => {
    const user = requireAuth();

    await db.tx(async tx => {
        const id = Math.floor(Math.random() * (2 ** 32 - 1));
        await tx.query("INSERT INTO lists (list_id, name, items) VALUES ($1, 'New List', '{}');", [id]);
        await tx.query("INSERT INTO users_to_lists (list_id, email) VALUES ($1, $2);", [id, user.email]);
        console.log(`Created list ${id}`);
    });

    await getLists().refresh();
});
