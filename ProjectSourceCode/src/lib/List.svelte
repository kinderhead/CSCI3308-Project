<script lang="ts">
    import { goto } from "$app/navigation";
    import { dragHandle, dragHandleZone } from "svelte-dnd-action";
    import { flip } from "svelte/animate";
    import type { ListItem } from "./list";
    import { addItem, liveList, removeItem, reorderItems, updateItem } from "./list.remote";

    let { id }: { id: string } = $props();

    const live = $derived(liveList(id));

    const flipDurationMs = 100;
    let list = $state<ListItem[]>([]);
    let itemName = $state("");

    $effect(() => {
        list = live.current ?? [];
    });
</script>

<div class="flex flex-col w-full h-full">
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
        <button
            type="submit"
            class="mt-2 mb-2 btn btn-secondary"
            onclick={async (e) => {
                e.preventDefault();
                await goto(`/discover?id=${id}`);
            }}>Search Kroger</button
        >
    </form>

    <table class="table table-striped">
        <tbody
            use:dragHandleZone={{ items: list, flipDurationMs }}
            onconsider={(e) => {
                list = e.detail.items;
            }}
            onfinalize={async (e) => {
                list = e.detail.items;
                await reorderItems({ id, items: list });
            }}
        >
            {#each list as i (i.id)}
                <tr animate:flip={{ duration: flipDurationMs }}>
                    <td use:dragHandle aria-label="drag-handle for {i.name}" class="w-0"> ::: </td>
                    <td class="align-middle text-center w-0">
                        <input
                            type="checkbox"
                            class="check flex m-auto w-4 h-4"
                            onchange={async (e) => {
                                if (e.currentTarget.checked) {
                                    await removeItem({ list_id: id, id: i.id });
                                }
                            }}
                        />
                    </td>
                    <td class="flex flex-row">
                        <input
                            class="w-full"
                            value={i.name}
                            onchange={async (e) => {
                                await updateItem({ list_id: id, id: i.id, name: e.currentTarget.value });
                            }}
                        />
                        {#if i.kroger_id}
                            <div title="Added from Kroger">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="lucide lucide-shopping-cart preview-icon"
                                    ><path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18" /><path
                                        d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25"
                                    /><circle cx="18" cy="20" r="2" /><circle cx="8" cy="20" r="2" /></svg
                                >
                            </div>
                        {/if}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
