<script lang="ts">
	import timeAgo from '$lib/functions/timeAgo';
	import DeleteDatasetButton from '../dataset/DeleteDatasetButton.svelte';
	import EditDatasetButton from './EditDatasetButton.svelte';
	import Divider from '../shared/Divider.svelte';

	const { dataset }: { dataset: DatasetFullData } = $props();
</script>

<div class="card flex w-full flex-col flex-wrap gap-3 px-3 py-4 lg:flex-nowrap">
	<div class="flex flex-wrap justify-between gap-3">
		<div class="space-y-2">
			<div class="flex items-center gap-2">
				<span class="iconify size-7 hugeicons--database sm:size-7"></span>
				<h1 class="text-primary text-xl font-bold sm:text-2xl">
					{dataset.title}
				</h1>
			</div>
			<p class="secondary-text-color">
				{dataset.description}
			</p>
		</div>
		<div class="ml-auto flex gap-2">
			<DeleteDatasetButton id={dataset.id} />
			<EditDatasetButton {dataset} />
		</div>
	</div>

	<Divider />

	<div class="flex flex-wrap items-center gap-3 font-medium">
		<span class="iconify size-5 hugeicons--files-01 sm:size-6"></span>
		<p class="text-base sm:text-lg">Instructions Count:</p>
		<span class="variant-ghost-primary h-fit rounded-full px-2 text-sm sm:text-base">
			{dataset.instructionsCount}
		</span>
	</div>

	<Divider />

	<div class="flex items-center gap-3 text-sm sm:text-base">
		<span class="iconify size-5 hugeicons--date-time sm:size-6"></span>
		<span class="secondary-text-color">
			Created: {timeAgo(new Date(dataset.createdAt))}
		</span>
		-
		<span class="secondary-text-color">
			Updated: {timeAgo(new Date(dataset.updatedAt))}
		</span>
	</div>
</div>
