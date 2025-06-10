<script>
	import { apiKeysState } from '../../../stores/apiKeys.svelte';
	import DeleteApiKeysButton from './DeleteApiKeysButton.svelte';
	import DeactivateApiKeysButton from './DeactivateApiKeysButton.svelte';
	import ActivateApiKeysButton from './ActivateApiKeysButton.svelte';
	import LoadingSpinner from '../shared/LoadingSpinner.svelte';
</script>

<tfoot class="!bg-surface-300 dark:!bg-surface-700">
	<tr>
		<th colspan="7">
			<div class="flex min-h-8 items-center gap-2">
				{#if apiKeysState.selectedKeys.length}
					<div>Selected keys: {apiKeysState.selectedKeys.length}</div>
					<DeleteApiKeysButton />
					<DeactivateApiKeysButton />
					<ActivateApiKeysButton />
				{/if}
			</div>
			{#if apiKeysState.actionInProgress}
				<div
					class="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/15"
				>
					<LoadingSpinner className="size-7" />
				</div>
			{/if}
		</th>
	</tr>
</tfoot>
