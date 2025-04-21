<script>
	import { AppBar, Avatar, LightSwitch } from '@skeletonlabs/skeleton';
	import NavigationMenu from './NavigationMenu.svelte';
</script>

<AppBar background="none" padding="px-0 py-4">
	<svelte:fragment slot="lead">
		<div class="flex items-center gap-3">
			<Avatar width="w-10" src="/mecha_agent_logo.webp">MA</Avatar>
			<h1 class="gradient-heading text-2xl font-extrabold">Mecha Agent</h1>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<LightSwitch rounded="rounded-full" />
		<NavigationMenu />
	</svelte:fragment>
</AppBar>
