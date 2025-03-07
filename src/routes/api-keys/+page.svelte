<script lang="ts">
	import { onMount } from 'svelte';
	import { apiKeysState } from '../../stores/apiKeys.svelte';
	import ApiKeysTable from '$lib/components/ApiKeys/ApiKeysTable.svelte';
	import CreateApiKeyForm from '$lib/components/ApiKeys/CreateApiKeyForm.svelte';
	import BackButton from '$lib/components/shared/BackButton.svelte';
	import clientFetchAPI from '$lib/functions/clientFetchAPI';

	function fetchApiKeys() {
		apiKeysState.isFetching = true;
		apiKeysState.isFetched = false;

		clientFetchAPI<ApiKeyRow[]>({ path: '/api/api-keys' })
			.then((data) => {
				if (data instanceof Array) {
					apiKeysState.apiKeys = data;
				}
			})
			.catch((error) => {
				apiKeysState.error = error;
			})
			.finally(() => {
				apiKeysState.isFetching = false;
				apiKeysState.isFetched = true;
			});
	}

	onMount(() => {
		if (!apiKeysState.apiKeys.length) {
			fetchApiKeys();
		}
	});

	apiKeysState.refetchApiKeys = fetchApiKeys;
</script>

<div class="flex flex-1 flex-col gap-4 space-y-4 py-4 sm:py-12">
	<div>
		<BackButton />
	</div>
	<ApiKeysTable />
	<CreateApiKeyForm />
</div>
