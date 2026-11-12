<script lang="ts">
    import { flip } from "svelte/animate";
    import type { ListItem } from "./list";
    import { addItem, liveList, removeItem, reorderItems, updateItem } from "./list.remote";
    import {dragHandleZone, dragHandle, type DndEvent} from "svelte-dnd-action";

    let { id }: { id: string } = $props();

    const live = $derived(liveList(id));

    const flipDurationMs = 100;
    let list = $state<ListItem[]>([]);
    let itemName = $state("");

    $effect(() => {
        list = live.current ?? [];
    });
</script>

<form>
    <input class="form-control" placeholder="Item name" bind:value={itemName} id="itemName" />
    <button
        type="submit"
        class="mt-2 mb-2 btn btn-primary"
        onclick={async () => {
            await addItem({ id, name: itemName });
            itemName = "";
        }}>Add item</button
    >
</form>

<table class="table table-striped">
    <tbody use:dragHandleZone={{ items: list, flipDurationMs }} onconsider={(e) => {
        list = e.detail.items;
    }} onfinalize={async (e) => {
        list = e.detail.items;
        await reorderItems({ id, items: list });
    }}>
        {#each list as i (i.id)}
            <tr animate:flip={{ duration: flipDurationMs }}>
                <td use:dragHandle aria-label="drag-handle for {i.name}" class="w-0">
                    :::
                </td>
                <td class="align-middle text-center w-0">
                    <input type="checkbox" class="check flex m-auto w-4 h-4" onchange={async (e) => {
                        if (e.currentTarget.checked) {
                            await removeItem({ list_id: id, id: i.id });
                        }
                    }}/>
                </td>
                <td>
                    <input
                        class="w-full"
                        value={i.name}
                        onchange={async (e) => {
                            await updateItem({ list_id: id, id: i.id, name: e.currentTarget.value });
                        }}
                    />
                </td>
            </tr>
        {/each}
    </tbody>
</table>
