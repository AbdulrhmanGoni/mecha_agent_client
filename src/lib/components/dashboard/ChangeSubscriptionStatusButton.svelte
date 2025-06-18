<script lang="ts">
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import Button from '$lib/components/shared/Button.svelte';
	import clientFetchAPI from '$lib/functions/clientFetchAPI';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { userDataState } from '../../../stores/userData.svelte';

	const { user }: { user: User } = $props();

	const toastStore = getToastStore();

	const isActive = $derived(user.subscription?.status === 'active');

	let loading = $state(false);
	let openConfirmationPrompt = $state(false);

	function actionFunction() {
		loading = true;
		const action = isActive ? 'deactivate-subscription' : 'activate-subscription';
		clientFetchAPI<string>({
			path: `/api/subscriptions/${action}`,
			method: isActive ? 'DELETE' : 'PATCH'
		})
			.then(async (res) => {
				await new Promise((r) => {
					setTimeout(r, 3000);
				});
				toastStore.trigger({
					message: res,
					background: 'variant-filled-success'
				});
				userDataState.user!.subscription!.status = isActive ? 'inactive' : 'active';
				openConfirmationPrompt = false;
			})
			.catch((err) => {
				toastStore.trigger({
					message: err,
					background: 'variant-filled-error'
				});
			})
			.finally(() => {
				loading = false;
			});
	}
</script>

<div class="space-y-2">
	{#if openConfirmationPrompt}
		<p class="text-center font-bold">
			{#if isActive}
				Sure you want to cancel auto renewing?
			{:else}
				Sure you want to activate auto renewing?
			{/if}
		</p>
		<p class="text-center text-sm">
			{#if isActive}
				At the end of subscription's period, the subscription will be deleted and your account will
				not be able to benefit from your plan's features.
			{:else}
				At the end of subscription's period, the subscription will be auto renewed and you will
				continue benefiting from your plan's features.
			{/if}
		</p>
		<div class="flex w-full gap-2">
			<Button
				size="sm"
				disabled={loading}
				class="{isActive
					? 'variant-outline-error'
					: 'variant-outline-secondary'} w-full justify-center"
				onclick={() => (openConfirmationPrompt = false)}
			>
				No
			</Button>
			<Button
				disabled={loading}
				size="sm"
				class="{isActive
					? 'variant-filled-error'
					: 'variant-filled-secondary'} w-full justify-center"
				onclick={actionFunction}
			>
				Yes
				{#if loading}
					<LoadingSpinner className="size-4" />
				{/if}
			</Button>
		</div>
	{:else}
		<p class="text-center text-sm font-semibold">
			{#if isActive}
				The subscription is active and it will be renewed automatically at the end of subscription's
				period.
			{:else}
				The subscription is inactive and it will be delete at the end of subscription's period.
			{/if}
		</p>
		<Button
			size="sm"
			class="{isActive ? 'variant-filled-error' : 'variant-filled-secondary'} w-full justify-center"
			onclick={() => (openConfirmationPrompt = true)}
		>
			{#if isActive}
				Cancel auto renewing
			{:else}
				Activate auto renewing
			{/if}

			{#if isActive}
				<span class="iconify size-4 hugeicons--cancel-01"></span>
			{:else}
				<span class="iconify size-4 hugeicons--activity-02"></span>
			{/if}
		</Button>
	{/if}
</div>
