<script lang="ts">
    import List from '#lib/List.svelte';

    let { params } = $props();
</script>

<List id={params.id}/>
