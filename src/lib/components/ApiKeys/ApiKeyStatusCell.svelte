<script lang="ts">
	const { apiKeyRow }: { apiKeyRow: ApiKeyRow } = $props();

	const badgeVariantMap: Record<ApiKeyRow['status'], string> = {
		Active: 'variant-filled-success',
		Inactive: 'variant-filled-warning'
	};
</script>

<span class={`${badgeVariantMap[apiKeyRow.status] || 'variant-filled'} badge`}>
	{apiKeyRow.status}
</span>
