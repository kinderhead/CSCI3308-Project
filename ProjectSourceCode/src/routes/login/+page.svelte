<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";

    let { form }: { form: ActionData } = $props();
</script>

<div class="container mt-4">
    <h1>Login</h1>

    {#if form?.error}
        <div class="alert alert-danger" role="alert">{form.error}</div>
    {/if}

    <form action="/login" method="POST" use:enhance>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                value={form?.email ?? ""}
                required
            />
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
                type="password"
                class="form-control"
                id="password"
                name="password"
                required
            />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
    </form>

    <p class="mt-3">
        Don't have an account? <a href="/register">Register here</a>
    </p>
</div>
