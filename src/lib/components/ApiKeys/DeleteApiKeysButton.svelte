<script lang="ts">
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { apiKeysState } from '../../../stores/apiKeys.svelte';
	import Button from '../shared/Button.svelte';
	import clientFetchAPI from '$lib/functions/clientFetchAPI';

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	function deleteApiKeys() {
		modalStore.trigger({
			type: 'confirm',
			title: 'Delete API Keys',
			body: 'Are you sure you want to delete the selected API Keys?',
			response(confirmed) {
				if (confirmed) {
					apiKeysState.actionInProgress = true;
					clientFetchAPI({
						path: '/api/api-keys',
						method: 'DELETE',
						body: apiKeysState.selectedKeys
					})
						.then(() => {
							toastStore.trigger({
								message: `API Keys were deleted successfully`,
								background: 'variant-filled-success'
							});
							apiKeysState.removeApiKeys(apiKeysState.selectedKeys);
							apiKeysState.selectedKeys = [];
						})
						.catch((error) => {
							toastStore.trigger({
								message: `Delete API Keys error: ${error}`,
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

<Button size="sm" class="variant-filled-error" onclick={deleteApiKeys}>Delete</Button>
