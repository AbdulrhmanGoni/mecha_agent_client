<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { initializeStores, Modal, Toast } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { fetchUserData } from '../stores/userData.svelte';
	import { onMount } from 'svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';

	initializeStores();

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	let { children } = $props();

	onMount(() => {
		if ($page.data.session) fetchUserData();
	});
</script>

<main class="container mx-auto flex min-h-screen flex-col gap-2 px-2">
	<Header />
	{@render children()}
	<Toast />
	<Modal />
</main>
<Footer />
