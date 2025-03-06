<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';

	const { apiKeyRow }: { apiKeyRow: ApiKeyRow } = $props();

	const badgeVariantMap: Record<ApiKeyPermission, string> = {
		inference: 'variant-filled-primary',
		write: 'variant-filled-warning',
		read: 'variant-filled-success'
	};
</script>

<div class="flex items-center -space-x-1">
	{#each apiKeyRow.permissions as permission}
		<span
			class={`${badgeVariantMap[permission]} badge-icon p-2 hover:z-10 sm:p-3 [&>*]:pointer-events-none`}
			use:popup={{
				event: 'hover',
				target: permission,
				placement: 'top'
			}}
		>
			{permission[0].toUpperCase()}
		</span>
		<div class={`card ${badgeVariantMap[permission]} px-4 py-2`} data-popup={permission}>
			<p>{permission}</p>
			<div class={`${badgeVariantMap[permission]} arrow`}></div>
		</div>
	{/each}
</div>
