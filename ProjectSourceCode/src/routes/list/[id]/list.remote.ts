import { db } from "#lib/server/db.js";
import type { ListItem } from "#lib/list.ts";
import { command, query } from "$app/server";
import * as v from 'valibot';

export const liveList = query.live(v.string(), async function* (id) {
    while (true) {
        let items: ListItem[] = [];
        for (const i of (await db.one("SELECT items FROM lists WHERE list_id = $1 LIMIT 1;", [id])).items) {
            items.push(JSON.parse(i));
        }

        yield items;
        await new Promise((f) => setTimeout(f, 1000));
    }
});

export const addItem = command(v.object({
    id: v.string(),
    name: v.string()
}), async function ({id, name}) {
    await db.query("UPDATE lists SET items = array_append(items, $2) WHERE list_id = $1;", [id, JSON.stringify({
        id: crypto.randomUUID(),
        name
    } satisfies ListItem)]);
    liveList(id).reconnect();
});
