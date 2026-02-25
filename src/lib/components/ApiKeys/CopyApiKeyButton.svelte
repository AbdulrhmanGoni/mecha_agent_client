<script lang="ts">
	const { apiKey }: { apiKey: string } = $props();
	let isCopied = $state(false);
</script>

{#if isCopied}
	<span class="iconify size-[18px] text-green-500 hugeicons--checkmark-square-04"></span>
{:else}
	<button
		aria-label="Copy API Key"
		class="flex items-center gap-1.5"
		onclick={(e) => {
			navigator.clipboard.writeText(apiKey);
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
