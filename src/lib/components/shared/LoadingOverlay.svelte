<script lang="ts">
	import LoadingSpinner from './LoadingSpinner.svelte';

	const { open }: { open?: boolean } = $props();

	let isLoading = $derived(open);
</script>

{#if isLoading}
	<dialog
		class="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/15"
	>
		<LoadingSpinner className="size-12 text-black dark:text-white" />
	</dialog>
{/if}
