<script>
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import NavigationMenu from './NavigationMenu.svelte';
	import { userDataState } from '../../stores/userData.svelte';
	import Button from './shared/Button.svelte';
	import { goto } from '$app/navigation';
	import SubscriptionModalButton from './dashboard/SubscriptionModalButton.svelte';
	import Logo from './Logo.svelte';
</script>

<AppBar background="none" padding="px-0 py-4">
	<svelte:fragment slot="lead">
		<div class="flex items-center gap-3">
			<Logo className="w-10 shrink-0" />
			<h1 class="gradient-heading text-xl font-extrabold sm:text-2xl">Mecha Agent</h1>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<LightSwitch rounded="rounded-full" />
		{#if userDataState.user?.currentPlan === 'Free'}
			<Button size="sm" class="variant-ghost-primary" onclick={() => goto('/plans')}>
				Upgrade 🚀
			</Button>
		{:else if userDataState.user?.subscription}
			<SubscriptionModalButton
				class="badge variant-gradient-primary-tertiary relative bg-gradient-to-br uppercase"
				user={userDataState.user}
			>
				{userDataState.user.currentPlan}
			</SubscriptionModalButton>
		{/if}
		{#if userDataState.isFetching}
			<div class="placeholder h-11 w-11 rounded-full"></div>
		{:else if userDataState.user}
			<NavigationMenu />
		{/if}
	</svelte:fragment>
</AppBar>
