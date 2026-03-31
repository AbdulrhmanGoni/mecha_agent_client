<script>
	import { apiKeysState } from '../../../stores/apiKeys.svelte';
	import ApiKeysError from './ApiKeysError.svelte';
	import ApiKeysTablePlaceholder from './ApiKeysTablePlaceholder.svelte';
	import ApiKeysTableRow from './ApiKeysTableRow.svelte';
	import ApiKeysTableFooter from './ApiKeysTableFooter.svelte';
	import CreateApiKeyButton from './CreateApiKeyButton.svelte';
</script>

<div class="table-container mb-7">
	<div class="mb-3 flex items-end gap-2">
		<h3 class="h3 flex-1 font-bold">API Keys</h3>
		<CreateApiKeyButton />
	</div>
	<table class="table table-interactive relative">
		<thead class="!variant-filled-primary">
			<tr>
				<th>Key Name</th>
				<th>Permissions</th>
				<th>Status</th>
				<th>Expiration Date</th>
				<th>Created At</th>
			</tr>
		</thead>
		<tbody class="relative max-h-[456px] overflow-auto">
			{#if apiKeysState.error}
				<ApiKeysTablePlaceholder>
					<ApiKeysError error={apiKeysState.error} />
				</ApiKeysTablePlaceholder>
			{:else}
				{#each apiKeysState.apiKeys as apiKeyRow (apiKeyRow.id)}
					<ApiKeysTableRow {apiKeyRow} />
				{:else}
					<ApiKeysTablePlaceholder>
						{apiKeysState.isFetched ? 'No API Keys' : ''}
					</ApiKeysTablePlaceholder>
				{/each}
			{/if}
		</tbody>
		<ApiKeysTableFooter />
	</table>
</div>
