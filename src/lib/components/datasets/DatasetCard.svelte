<script lang="ts">
	import { goto } from '$app/navigation';
	import timeAgo from '$lib/functions/timeAgo';

	const dataset: Dataset = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div
	class="card cursor-pointer space-y-2 p-4 transition-colors hover:bg-surface-200 dark:hover:bg-surface-700"
	onclick={() => goto('/datasets/' + dataset.id)}
>
	<p class="primary-text-color text-lg font-bold">
		{dataset.title}
	</p>
	<p class="secondary-text-color text-sm">
		{dataset.description}
	</p>
	<div class="secondary-text-color flex justify-start gap-2 text-sm">
		<span>
			Created: {timeAgo(new Date(dataset.createdAt))}
		</span>
		-
		<span>
			Updated: {timeAgo(new Date(dataset.updatedAt))}
		</span>
	</div>
</div>
