<script lang="ts">
    import List from "#lib/List.svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import type { ActionData } from "./$types";
    import { createList, getLists } from "./lists.remote";

    let { form }: { form: ActionData } = $props();

    let lists = getLists();
    let currentList = $state<string | undefined>(page.url.searchParams.get("id") ?? undefined);

    $effect(() => {
        goto(currentList ? `/home?${new URLSearchParams({ id: currentList })}` : "/home", { replace: true, shallow: true });
    });
</script>

<!-- Page Layout -->
<div class="page-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
        <div class="sidebar-item">
            <button type="button" class="new-list-btn" onclick={async () => {
                await createList();
            }}>New List</button>
        </div>

        <div class="sidebar-item flex flex-col items-start">
            <p>My Lists:</p>
            {#each await lists as l (l.list_id)}
                <button class="w-full text-left p-1 hover:bg-gray-400 transition-colors" onclick={() => {
                    currentList = l.list_id.toString();
                }}>
                    {l.name}
                </button>
            {/each}
        </div>

        <a href="/logout" class="logout"> Logout </a>
    </aside>

    <!-- Main Content -->
    <div class="main-area">
        <main class="content">
            {#if currentList}
                <List id={currentList}/>
            {:else}
                <h2>Welcome to GrocerWees!</h2>
            {/if}
        </main>
    </div>
</div>

<style>
    .new-list-btn {
        display: block;
        padding: 0.75rem 1.5rem;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
    }

    .new-list-btn:hover {
        background-color: #388e3c;
    }
</style>
