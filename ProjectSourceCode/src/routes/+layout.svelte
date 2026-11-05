<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
    import 'bootstrap/dist/css/bootstrap.min.css';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
    <nav class="navbar navbar-expand-sm border-bottom">
        <div class="container">
            <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbar-collapse" aria-controls="navbar" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbar-collapse">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/discover">Discover</a>
                    </li>
                </ul>
                <div class="nav-item me-1">
                    <a class="nav-link" href="/logout">Log Out</a>
                </div>
            </div>
        </div>
    </nav>
</header>

<div class="h-100 flex flex-col">
    {@render children()}
</div>

<footer class="text-center text-muted w-100 mt-auto fixed-bottom">
    <p>
        &copy; The Grocery Gang 2026
    </p>
</footer>
