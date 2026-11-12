<script lang="ts">
    import { flip } from "svelte/animate";
    import { addItem, liveList, removeItem, updateItem } from "./list.remote";

    let { id }: { id: string } = $props();

    const list = $derived(liveList(id));
    let itemName = $state("");
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
    <tbody>
        {#each await list as l (l.id)}
            <tr animate:flip>
                <td class="align-middle text-center w-0">
                    <input type="checkbox" class="check flex m-auto w-4 h-4" onchange={async (e) => {
                        if (e.currentTarget.checked) {
                            await removeItem({ list_id: id, id: l.id });
                        }
                    }}/>
                </td>
                <td>
                    <input
                        class="w-full"
                        value={l.name}
                        onchange={async (e) => {
                            await updateItem({ list_id: id, id: l.id, name: e.currentTarget.value });
                        }}
                    />
                </td>
            </tr>
        {/each}
    </tbody>
</table>
