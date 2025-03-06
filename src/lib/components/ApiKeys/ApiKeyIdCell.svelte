<script lang="ts">
	import Icon from '@iconify/svelte';

	const { apiKeyRow }: { apiKeyRow: ApiKeyRow } = $props();
	let isCopied = $state(false);
</script>

<div class="flex gap-1.5">
	{apiKeyRow.key.slice(0, 10) + '...' + apiKeyRow.key.slice(apiKeyRow.key.length - 11)}
	{#if isCopied}
		<Icon icon="line-md:clipboard-check" color="green" width="20" height="20" />
	{:else}
		<Icon
			icon="tabler:copy"
			width="20"
			height="20"
			onclick={(e) => {
				navigator.clipboard.writeText(apiKeyRow.key);
				isCopied = true;
				e.stopPropagation();
				setTimeout(() => {
					isCopied = false;
				}, 5000);
			}}
		/>
	{/if}
</div>
