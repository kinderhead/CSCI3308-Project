<script lang="ts">
    import List from '#lib/List.svelte';

    let { params } = $props();
</script>

<div class="m-8">
    <List id={params.id}/>
</div>
