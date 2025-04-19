<script lang="ts">
	const { apiKeyRow }: { apiKeyRow: ApiKeyRow } = $props();
	let isCopied = $state(false);
</script>

<div class="flex gap-1.5">
	{apiKeyRow.key.slice(0, 10) + '...' + apiKeyRow.key.slice(apiKeyRow.key.length - 11)}
	{#if isCopied}
		<span class="iconify size-[18px] text-green-500 hugeicons--checkmark-square-04"></span>
	{:else}
		<button
			aria-label="Copy API Key"
			onclick={(e) => {
				navigator.clipboard.writeText(apiKeyRow.key);
				isCopied = true;
				e.stopPropagation();
				setTimeout(() => {
					isCopied = false;
				}, 5000);
			}}
		>
			<span class="iconify size-[18px] hugeicons--copy-01"></span>
		</button>
	{/if}
</div>
