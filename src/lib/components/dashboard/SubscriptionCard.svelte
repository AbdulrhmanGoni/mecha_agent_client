<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import ChangeSubscriptionStatusButton from './ChangeSubscriptionStatusButton.svelte';
	import Divider from '../shared/Divider.svelte';

	const { user }: { user: User } = $props();

	const modalStore = getModalStore();

	const isActive = $derived(user.subscription?.status === 'active');
</script>

<div class="card relative z-10 flex w-full max-w-lg flex-col gap-3.5 p-4">
	<div class="mb-2 flex">
		<p class="flex-1 text-center text-xl font-bold">Subscription</p>
		<button class="size-4" onclick={modalStore.close} aria-label="Close subscription modal">
			<span class="iconify size-4 cursor-pointer hugeicons--cancel-01"></span>
		</button>
	</div>
	<div class="flex w-full justify-between">
		Plan
		<p
			class="badge uppercase {user.currentPlan === 'Free'
				? 'variant-gradient-secondary-primary'
				: 'variant-filled-primary'} bg-gradient-to-br"
		>
			{user.currentPlan}
		</p>
	</div>
	<div class="flex w-full justify-between">
		Status
		<p
			class="{isActive
				? 'variant-filled-success'
				: 'variant-filled-warning'} rounded-md px-2.5 py-0.5"
		>
			{user.subscription?.status}
		</p>
	</div>
	<div class="flex w-full justify-between gap-3">
		Subscribed at
		<p class="secondary-text-color">
			{new Date(user.subscription?.createdAt!).toDateString()}
		</p>
	</div>
	<Divider />
	<ChangeSubscriptionStatusButton {user} />
</div>
