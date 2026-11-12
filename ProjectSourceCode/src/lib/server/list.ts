import type { ListItem } from "#lib/list.ts";
import { db } from "./db";

export async function getItems(id: string) {
    let items: ListItem[] = [];
    for (const i of (await db.one("SELECT items FROM lists WHERE list_id = $1 LIMIT 1;", [id])).items) {
        items.push(JSON.parse(i));
    }
    return items;
}