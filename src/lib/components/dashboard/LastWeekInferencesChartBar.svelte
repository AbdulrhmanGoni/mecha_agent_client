<script lang="ts">
	import decorateNumber from '$lib/functions/decorateNumber';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	const { value, day, percitage }: { value: number; day: string; percitage: number } = $props();

	const popupHover: PopupSettings = {
		event: 'hover',
		target: day,
		placement: 'top'
	};
</script>

<span
	use:popup={popupHover}
	class="h-full w-full max-w-7 origin-bottom rounded-t-lg bg-primary-500 transition-colors hover:bg-primary-700 sm:max-w-11"
	style="transform: scaleY({percitage});"
></span>

<div class="card variant-filled-surface z-50 w-28 px-2 py-1 text-start text-sm" data-popup={day}>
	<p>{day}</p>
	<div class="flex w-full justify-between">
		<p>Inferences:</p>
		<span>{decorateNumber(value)}</span>
	</div>
	<div class="variant-filled-surface arrow"></div>
</div>
