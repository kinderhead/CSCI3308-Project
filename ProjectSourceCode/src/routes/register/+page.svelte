<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";

    let { form }: { form: ActionData } = $props();
</script>

<div class="container mt-4">
    <h1>Register</h1>

    {#if form?.error}
        <div class="alert alert-danger" role="alert">{form.error}</div>
    {/if}

    <form action="/register" method="POST" use:enhance>
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
                type="text"
                class="form-control"
                id="name"
                name="name"
                value={form?.name ?? ""}
                required
            />
        </div>
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
                minlength="8"
                required
            />
        </div>
        <div class="mb-3">
            <label for="confirm_password" class="form-label"
                >Confirm password</label
            >
            <input
                type="password"
                class="form-control"
                id="confirm_password"
                name="confirm_password"
                minlength="8"
                required
            />
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
    </form>

    <p class="mt-3">
        Already have an account? <a href="/login">Login here</a>
    </p>
</div>
