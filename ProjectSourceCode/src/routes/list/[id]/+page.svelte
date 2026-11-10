<script lang="ts">
    import { addItem, liveList } from "./list.remote";

    let { params } = $props();

    const list = $derived(liveList(params.id));
    let itemName = $state("");


    let count = $state(0);
</script>

{#each await list as l (l.id)}
    <div>
        <p>{l.name}</p>
    </div>
{/each}

<form>
    <input class="form-control" placeholder="Item name" bind:value={itemName} id="itemName"/>
    <button type="submit" class="m-2 btn btn-primary" onclick={async () => {
        await addItem({ id: params.id, name: itemName });
        itemName = "";
    }}>Add item</button>
</form>
