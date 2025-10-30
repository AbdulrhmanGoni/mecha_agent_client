<script lang="ts">
	import PlanCard from '$lib/components/PlanCard.svelte';
	import ErrorPage from '$lib/components/shared/ErrorPage.svelte';
	import { userDataState } from '../../stores/userData.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>Plans</title>
	<meta
		name="description"
		content="The available plans in 'Mecha Agent' app are the 'Free' plan which is the default, and 'Pro' plan which costs only $5 per month"
	/>
</svelte:head>

<div class="mt-12 flex flex-1 flex-col items-center justify-center">
	<div class="flex w-full flex-col items-center justify-center gap-8 sm:flex-row">
		{#if data.plans}
			{#each data.plans as plan}
				<PlanCard {plan} user={userDataState.user} />
			{/each}
		{:else}
			<ErrorPage
				iconName="hugeicons--rss-error"
				title="Couldn't fetch the plans"
				errorMessage={data.error}
				hideBackButton
				hideRetryButton
			/>
		{/if}
	</div>
	<p class="mt-4 text-lg italic">Subscriptions is disabled currently</p>
</div>
