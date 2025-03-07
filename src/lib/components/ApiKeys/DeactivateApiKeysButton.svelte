<script lang="ts">
	import clientFetchAPI from '$lib/functions/clientFetchAPI';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { apiKeysState } from '../../../stores/apiKeys.svelte';
	import Button from '../shared/Button.svelte';

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	function deactivateApiKeys() {
		modalStore.trigger({
			type: 'confirm',
			title: 'Deactivate API Keys',
			body: 'Are you sure you want to deactivate the selected API Keys?',
			response(confirmed) {
				if (confirmed) {
					apiKeysState.actionInProgress = true;
					clientFetchAPI({
						path: '/api/api-keys/deactivate',
						method: 'PATCH',
						body: apiKeysState.selectedKeys
					})
						.then(() => {
							toastStore.trigger({
								message: `API Keys were deactivated successfully`,
								background: 'variant-filled-success'
							});
							apiKeysState.updateApiKeys(apiKeysState.selectedKeys, { status: 'Inactive' });
							apiKeysState.selectedKeys = [];
						})
						.catch((error) => {
							toastStore.trigger({
								message: `Deactivate API Keys error: ${error}`,
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

<Button size="sm" class="variant-filled-secondary" onclick={deactivateApiKeys}>Deactivate</Button>
