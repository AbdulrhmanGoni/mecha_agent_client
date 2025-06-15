<script lang="ts">
	import { goto } from '$app/navigation';
	import clientFetchAPI from '$lib/functions/clientFetchAPI';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import Button from './shared/Button.svelte';
	import LoadingOverlay from './shared/LoadingOverlay.svelte';
	const { plan, user }: { plan: Plan; user: User | null } = $props();

	const isUserCurrentPlan = $derived(user?.currentPlan === plan.planName);
	const isNotPaidUser = $derived(user?.currentPlan !== 'Free');
	const isPaidPlan = plan.planName !== 'Free';

	const toastStore = getToastStore();

	let isLoading = $state(false);

	async function goToCheckout(plan: string) {
		if (user) {
			isLoading = true;
			await clientFetchAPI<{ url: string }>({
				path: `/api/subscriptions/sessions/new?plan=${plan}`
			})
				.then((res) => {
					if (res.url) {
						window.location.href = res.url;
					} else {
						toastStore.trigger({
							message:
								'Our server failed to create a checkout session for you, Please try again later',
							background: 'variant-filled-error'
						});
					}
				})
				.catch((error) => {
					toastStore.trigger({
						message: error,
						background: 'variant-filled-error'
					});
				})
				.finally(() => {
					isLoading = false;
				});
		}
	}
</script>

<div
	class={`card relative ${isNotPaidUser && !isPaidPlan ? 'opacity-70' : 'card-hover'} shadow-xl ${isUserCurrentPlan ? 'border border-primary-500' : ''} flex w-full max-w-md flex-col space-y-4 rounded-lg p-6`}
>
	<h1 class="text-2xl font-bold sm:text-3xl">
		{plan.planName} <span class="ms-3">${plan.subscriptionCostPerMonth}/m</span>
	</h1>

	<ul class="flex flex-col gap-2">
		<li class="flex justify-between gap-4 font-semibold">
			<p>Published Agents count :</p>
			<span>{plan.maxPublishedAgentsCount}</span>
		</li>
		<li class="flex justify-between gap-4 font-semibold">
			<p>Inferences per day :</p>
			<span>{plan.maxInferencesPerDay || 0}</span>
		</li>
	</ul>

	<Button
		class={`w-fit ${isUserCurrentPlan ? 'bg-primary-500/50' : 'bg-primary-500'}`}
		disabled={isUserCurrentPlan || (isNotPaidUser && !isPaidPlan)}
		onclick={() => {
			if (isPaidPlan && !isNotPaidUser) {
				goToCheckout(plan.planName);
			} else if (!user) {
				goto('/sign-in');
			}
		}}
	>
		{#if isUserCurrentPlan}
			Current Plan
		{:else if isPaidPlan && user}
			Upgrade 🚀
		{:else}
			Get Started 🚀
		{/if}
	</Button>
	{#if isPaidPlan}
		<div class="bookmark after:transition dark:after:!border-b-surface-800"></div>
	{/if}
</div>
<LoadingOverlay open={isLoading} />

<style>
	.bookmark {
		background-color: rgb(var(--color-primary-500) / var(--tw-bg-opacity, 1));
		height: 40px;
		position: absolute;
		top: 0;
		right: 20px;
		width: 28px;
		margin: 0 !important;
	}

	.bookmark:after {
		content: '';
		display: block;
		border: 14px solid transparent;
		border-bottom-color: rgb(var(--color-surface-100));
		position: absolute;
		bottom: -1px;
	}
</style>
