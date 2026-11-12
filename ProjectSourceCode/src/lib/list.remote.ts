import type { ListItem } from "#lib/list.ts";
import { db } from "#lib/server/db.js";
import { command, query } from "$app/server";
import * as v from 'valibot';
import { getItems } from "./server/list";
import { error } from "@sveltejs/kit";

export const liveList = query.live(v.string(), async function* (id) {
    while (true) {
        yield getItems(id);
        await new Promise((f) => setTimeout(f, 1000));
    }
});

export const getList = query(v.string(), async function (id) {
    return getItems(id);
});

const itemSchema = v.object({
    id: v.pipe(
        v.string(),
        v.nonEmpty()
    ),
    name: v.pipe(
        v.string(),
        v.nonEmpty()
    ),
    kroger: v.optional(v.string())
});

export const addItem = command(itemSchema, async function ({ id, name, kroger }) {
    await db.query("UPDATE lists SET items = array_append(items, $2) WHERE list_id = $1;", [id, JSON.stringify({
        id: crypto.randomUUID(),
        name,
        kroger_id: kroger
    } satisfies ListItem)]);
    liveList(id).reconnect();
});

export const updateItem = command(v.object({
    list_id: v.pipe(
        v.string(),
        v.nonEmpty()
    ),
    id: v.pipe(
        v.string(),
        v.nonEmpty()
    ),
    name: v.pipe(
        v.string(),
        v.nonEmpty()
    ),
    kroger: v.optional(v.string())
}), async function ({ list_id, id, name, kroger }) {
    const items = await getItems(list_id);

    for (const i of items) {
        if (i.id === id) {
            i.name = name;
            if (kroger) i.kroger_id = kroger;

            await db.query("UPDATE lists SET items = $2 WHERE list_id = $1;", [list_id, items]);
            liveList(list_id).reconnect();
            return;
        }
    }

    error(404, "Item not found");
});

export const removeItem = command(v.object({
    list_id: v.pipe(
        v.string(),
        v.nonEmpty()
    ),
    id: v.pipe(
        v.string(),
        v.nonEmpty()
    )
}), async function ({ list_id, id }) {
    let items = await getItems(list_id);
    items = items.filter(i => i.id !== id);
    await db.query("UPDATE lists SET items = $2 WHERE list_id = $1;", [list_id, items]);
    liveList(list_id).reconnect();
});
