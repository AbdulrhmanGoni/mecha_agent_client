<script>
	import { apiKeysState } from '../../../stores/apiKeys.svelte';
	import ApiKeysError from './ApiKeysError.svelte';
	import ApiKeysLoadingState from './ApiKeysLoadingState.svelte';
	import NoApiKeysMessage from './NoApiKeysMessage.svelte';
	import ApiKeysTableRow from './ApiKeysTableRow.svelte';
	import ApiKeysTableFooter from './ApiKeysTableFooter.svelte';
</script>

<div class="table-container mb-7">
	<div class="mb-3 flex gap-2">
		<h3 class="h3 flex-1 font-bold">API Keys</h3>
	</div>
	<table class="table table-interactive relative">
		<thead class="!variant-filled-primary">
			<tr>
				<th>Key</th>
				<th>Key Name</th>
				<th>Permissions</th>
				<th>Status</th>
				<th>Expiration Date</th>
				<th>Created At</th>
			</tr>
		</thead>
		<tbody class="relative max-h-96 overflow-auto">
			{#if apiKeysState.isFetched && apiKeysState.apiKeys.length}
				{#each apiKeysState.apiKeys as apiKeyRow}
					<ApiKeysTableRow {apiKeyRow} />
				{/each}
			{:else}
				<tr>
					<td class="h-32 hover:bg-surface-100 dark:hover:bg-surface-800">
						{#if apiKeysState.isFetching}
							<ApiKeysLoadingState />
						{:else if apiKeysState.error}
							<ApiKeysError error={apiKeysState.error} />
						{:else if apiKeysState.isFetched}
							<NoApiKeysMessage />
						{/if}
					</td>
				</tr>
			{/if}
		</tbody>
		<ApiKeysTableFooter />
	</table>
</div>
