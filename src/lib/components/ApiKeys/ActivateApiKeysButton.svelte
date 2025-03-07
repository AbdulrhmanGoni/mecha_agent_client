<script lang="ts">
	import clientFetchAPI from '$lib/functions/clientFetchAPI';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { apiKeysState } from '../../../stores/apiKeys.svelte';
	import Button from '../shared/Button.svelte';

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	function activateApiKeys() {
		modalStore.trigger({
			type: 'confirm',
			title: 'Activate API Keys',
			body: 'Are you sure you want to activate the selected API Keys?',
			response(confirmed) {
				if (confirmed) {
					apiKeysState.actionInProgress = true;
					clientFetchAPI({
						path: '/api/api-keys/activate',
						method: 'PATCH',
						body: apiKeysState.selectedKeys
					})
						.then(() => {
							toastStore.trigger({
								message: `API Keys were activated successfully`,
								background: 'variant-filled-success'
							});
							apiKeysState.updateApiKeys(apiKeysState.selectedKeys, { status: 'Active' });
							apiKeysState.selectedKeys = [];
						})
						.catch((error) => {
							toastStore.trigger({
								message: `Activate API Keys error: ${error}`,
								background: 'variant-filled-error'
							});
						})
						.finally(() => {
							apiKeysState.actionInProgress = false;
						});
				}
			}
		});
	}
</script>

<Button size="sm" class="variant-filled-primary" onclick={activateApiKeys}>Activate</Button>
