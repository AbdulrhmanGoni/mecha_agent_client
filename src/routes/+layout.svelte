<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { initializeStores, Modal, Toast } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	initializeStores();

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	let { data, children } = $props();
</script>

<main class="container mx-auto flex min-h-screen flex-col gap-2 px-2">
	{#if data.user}
		<Header />
	{/if}
	{@render children()}
	<Toast />
	<Modal />
</main>
