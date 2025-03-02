<script>
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import NavigationMenu from './NavigationMenu.svelte';
</script>

<AppBar background="none" padding="px-0 py-4">
	<svelte:fragment slot="lead">
		<h1 class="gradient-heading text-2xl font-extrabold">Mecha Agent</h1>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<LightSwitch rounded="rounded-full" />
		<NavigationMenu />
	</svelte:fragment>
</AppBar>
