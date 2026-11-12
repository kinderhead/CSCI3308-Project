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

<header class="header">
    <nav class="navbar navbar-expand-sm w-100">
        <div class="container-fluid">

            <!-- Hamburger Menu -->
            <button class="navbar-toggler menu-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbar-collapse"
                aria-controls="navbar-collapse"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Website Name -->
            <a class="site-name navbar-brand" href="/" title="Home">
                <enhanced:img src="#lib/assets/logo_with_fellas.png" alt="GrocerWees Logo" class="h-10 w-auto" />
            </a>

            <!-- Collapsible Navigation -->
            <div class="collapse navbar-collapse" id="navbar-collapse">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/discover">
                            Discover
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link account" href="/logout">
                            Log Out
                        </a>
                    </li>
                </ul>
            </div>

        </div>
    </nav>
</header>

<div class="h-100 flex flex-col">
    {@render children()}
</div>

<footer class="footer text-center text-muted w-100 mt-auto fixed-bottom">
    <p class="footer-text">
        &copy; The Grocery Gang 2026
    </p>
</footer>




