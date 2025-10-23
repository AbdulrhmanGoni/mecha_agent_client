<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import ChangeSubscriptionStatusButton from './ChangeSubscriptionStatusButton.svelte';
	import Divider from '../shared/Divider.svelte';

	const { user }: { user: User } = $props();

	const modalStore = getModalStore();

	const isActive = $derived(user.subscription?.status === 'active');
	const subscription = $derived(user.subscription!);
</script>

<div class="card relative z-10 flex w-full max-w-lg flex-col gap-3.5 p-4">
	<div class="mb-2 flex">
		<p class="flex-1 text-center text-xl font-bold">Subscription</p>
		<button class="size-4" onclick={modalStore.close} aria-label="Close subscription modal">
			<span class="iconify size-4 cursor-pointer hugeicons--cancel-01"></span>
		</button>
	</div>
	<div class="flex w-full justify-between">
		<p class="font-semibold">Plan:</p>
		<p
			class="badge uppercase {subscription.planName === 'Free'
				? 'variant-gradient-secondary-primary'
				: 'variant-filled-primary'} bg-gradient-to-br"
		>
			{subscription.planName}
		</p>
	</div>
	<div class="flex w-full justify-between">
		<p class="font-semibold">Status:</p>
		<p
			class="{isActive
				? 'variant-filled-success'
				: 'variant-filled-warning'} rounded-md px-2.5 py-0.5"
		>
			{user.subscription?.status}
		</p>
	</div>
	<div class="flex w-full justify-between gap-3">
		<p class="font-semibold">Period start:</p>
		<p class="secondary-text-color">
			{new Date(subscription.currentPeriodStart * 1000).toDateString()}
		</p>
	</div>
	<div class="flex w-full justify-between gap-3">
		<p class="font-semibold">Period end:</p>
		<p class="secondary-text-color">
			{new Date(subscription.currentPeriodEnd * 1000).toDateString()}
		</p>
	</div>
	<Divider />
	<ChangeSubscriptionStatusButton {user} />
</div>
