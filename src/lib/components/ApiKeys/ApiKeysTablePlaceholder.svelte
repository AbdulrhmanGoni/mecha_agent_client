<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<tr>
	<td class="h-[456px] hover:bg-surface-100 dark:hover:bg-surface-800" colspan="5">
		<div
			class="absolute left-0 top-0 flex h-full w-full items-center justify-center text-center text-lg font-semibold"
		>
			{@render children()}
		</div>
	</td>
</tr>
