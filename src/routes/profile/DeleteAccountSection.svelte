<script lang="ts">
	import Button from '$lib/components/shared/Button.svelte';
	import LoadingSpinner from '$lib/components/shared/LoadingSpinner.svelte';
	import clientFetchAPI from '$lib/functions/clientFetchAPI';
	import { signOut } from '@auth/sveltekit/client';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	let loading = $state(false);

	function handleDeleteAccount() {
		modalStore.trigger({
			response(response) {
				if (response) {
					loading = true;
					clientFetchAPI<boolean>({ path: '/api/users', method: 'DELETE' })
						.then((response) => {
							if (response) {
								signOut();
							} else {
								toastStore.trigger({
									message: 'Failed to delete account. Please try again later.',
									background: 'variant-filled-error',
									timeout: 5000
								});
							}
						})
						.catch((error) => {
							toastStore.trigger({
								message: error,
								background: 'variant-filled-error',
								timeout: 5000
							});
						})
						.finally(() => {
							loading = false;
						});
				}
			},
			type: 'confirm',
			title: 'Delete Account',
			body: 'Are you sure you want to delete your account? You cannot undone action and you will lose all your data.',
			buttonTextConfirm: 'Delete'
		});
	}
</script>

<div class="space-y-2">
	<p class="flex items-center gap-2 text-xl font-bold">
		<span class="iconify size-7 hugeicons--delete-02"></span>
		<span class="flex-1">Delete Account</span>
	</p>
	<p class="secondary-text-color">
		Deleting your account means that you will lose access to all agents, datasets and api keys you
		had created because they all will be deleted with your account forever
	</p>
	<Button onclick={handleDeleteAccount} class="variant-filled-error gap-2.5">
		Delete
		{#if loading}
			<LoadingSpinner />
		{:else}
			<span class="iconify size-5 hugeicons--delete-02"></span>
		{/if}
	</Button>
</div>
