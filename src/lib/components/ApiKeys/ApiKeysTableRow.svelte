<script lang="ts">
	import { apiKeysState } from '../../../stores/apiKeys.svelte';
	import ApiKeyStatusCell from './ApiKeyStatusCell.svelte';
	import ApiKeyPermissionsCell from './ApiKeyPermissionsCell.svelte';
	import ApiKeyIdCell from './ApiKeyIdCell.svelte';

	const { apiKeyRow }: { apiKeyRow: ApiKeyRow } = $props();
	let isSelected = $derived(apiKeysState.selectedKeys.includes(apiKeyRow.id));
</script>

<tr
	class={`${isSelected ? 'table-row-checked' : ''}`}
	onclick={() => {
		if (isSelected) {
			apiKeysState.selectedKeys = apiKeysState.selectedKeys.filter(
				(keyId) => keyId !== apiKeyRow.id
			);
		} else {
			apiKeysState.selectedKeys.push(apiKeyRow.id);
		}
	}}
>
	<td><ApiKeyIdCell {apiKeyRow} /></td>
	<td>{apiKeyRow.keyName}</td>
	<td><ApiKeyPermissionsCell {apiKeyRow} /></td>
	<td><ApiKeyStatusCell {apiKeyRow} /></td>
	<td>{new Date(apiKeyRow.expirationDate).toDateString()}</td>
	<td>{new Date(apiKeyRow.createdAt).toDateString()}</td>
</tr>
