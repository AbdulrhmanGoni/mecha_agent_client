<script lang="ts">
	import { apiKeysState } from '../../../stores/apiKeys.svelte';
	import DeleteApiKeysButton from './DeleteApiKeysButton.svelte';
	import DeactivateApiKeysButton from './DeactivateApiKeysButton.svelte';
	import ActivateApiKeysButton from './ActivateApiKeysButton.svelte';
	import LoadingSpinner from '../shared/LoadingSpinner.svelte';
	import Button from '../shared/Button.svelte';

	function navigate(pageNumber: number) {
		apiKeysState.page = pageNumber;
		apiKeysState.refetchApiKeys();
	}

	function goToNextPage() {
		navigate(apiKeysState.page + 1);
	}

	function goToPrevPage() {
		navigate(apiKeysState.page - 1);
	}

	const noPrevPage = $derived(apiKeysState.page < 1);
	const noNextPage = $derived(apiKeysState.apiKeys.length < apiKeysState.pageSize);
</script>

<tfoot class="!bg-surface-300 dark:!bg-surface-700">
	<tr>
		<th colspan="5">
			<div class="flex min-h-8 items-center gap-2">
				<div class="flex flex-1 items-center gap-2">
					{#if apiKeysState.selectedKeys.length}
						<div>Selected keys: {apiKeysState.selectedKeys.length}</div>
						<DeleteApiKeysButton />
						<DeactivateApiKeysButton />
						<ActivateApiKeysButton />
					{/if}
				</div>

				<div class="flex items-center gap-2">
					<Button
						class="variant-ghost-primary {noPrevPage ? 'cursor-not-allowed opacity-50' : ''}"
						disabled={noPrevPage}
						size="sm"
						onclick={goToPrevPage}
					>
						<span class="iconify size-5 hugeicons--arrow-left-01"></span>
						Prev
					</Button>
					<span class="text-nowrap font-bold">Page {apiKeysState.page + 1}</span>
					<Button
						size="sm"
						onclick={goToNextPage}
						class="variant-ghost-primary {noNextPage ? 'cursor-not-allowed opacity-50' : ''}"
						disabled={noNextPage}
					>
						Next
						<span class="iconify size-5 hugeicons--arrow-right-01"></span>
					</Button>
				</div>
			</div>
			{#if apiKeysState.actionInProgress || apiKeysState.isFetching}
				<div
					class="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/15"
				>
					<LoadingSpinner sizeClass="size-7" />
				</div>
			{/if}
		</th>
	</tr>
</tfoot>
