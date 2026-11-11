<script lang="ts">
    import { addItem, liveList } from "./list.remote";

    let { id } : { id: string } = $props();

    const list = $derived(liveList(id));
    let itemName = $state("");
</script>

{#each await list as l (l.id)}
    <div>
        <p>{l.name}</p>
    </div>
{/each}

<form>
    <input class="form-control" placeholder="Item name" bind:value={itemName} id="itemName"/>
    <button type="submit" class="m-2 btn btn-primary" onclick={async () => {
        await addItem({ id, name: itemName });
        itemName = "";
    }}>Add item</button>
</form>
