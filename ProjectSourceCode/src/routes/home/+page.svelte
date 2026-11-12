
<script lang="ts">
    import type { ActionData } from "./$types";

    let { form }: { form: ActionData } = $props();
</script>

<!-- Page Layout -->
<div class="page-layout">

    <!-- Sidebar -->
    <aside class="sidebar">

        <div class="sidebar-item">
            <button type="button" class="new-list-btn">
                New List
            </button>
        </div>

        <div class="sidebar-item">
            My Lists:
        </div>

        

        <a href="#" class="logout">
            Logout
        </a>

    </aside>

    <!-- Main Content -->
    <div class="main-area">
        <main class="content">
            <h2>Welcome to GrocerWees!</h2>
        </main>
    </div>

</div>

<style>
    .new-list-btn {
        display: block;
        padding: 0.75rem 1.5rem;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
    }

    .new-list-btn:hover {
        background-color: #388E3C;
    }
</style>
