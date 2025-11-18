<script lang="ts">
	import Button from '../shared/Button.svelte';

	const { url }: { url: string } = $props();

	let isCopied = $state(false);

	function onCopy() {
		navigator.clipboard.writeText(url);
		if (!isCopied) {
			isCopied = true;
			setTimeout(() => {
				isCopied = false;
			}, 5000);
		}
	}
</script>

<Button onclick={onCopy} size="sm" class="variant-filled-secondary my-3 gap-2">
	{#if isCopied}
		Public chat link copied
		<span class="iconify size-4 hugeicons--checkmark-circle-03"></span>
	{:else}
		Copy public chat link
		<span class="iconify size-5 hugeicons--copy-link"></span>
	{/if}
</Button>
