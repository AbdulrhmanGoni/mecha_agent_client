<script lang="ts">
	import decorateNumber from '$lib/functions/decorateNumber';
	import LastWeekInferencesChartBar from './LastWeekInferencesChartBar.svelte';

	const { user }: { user: User } = $props();

	const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const last7Days: string[] = [];

	const today = new Date();
	today.setDate(today.getDate() - 1);
	const yasterday = new Date(today);

	for (let i = 0; i < 7; i++) {
		const date = new Date();
		date.setDate(yasterday.getDate() - i);
		const dayName = daysOfWeek[date.getDay()];
		last7Days.push(dayName);
	}

	const chartData = last7Days.reduce<{
		min: number;
		max: number;
		values: { value: number; dayName: string }[];
	}>(
		(chartData, dayName, dayIndx) => {
			const dayValue = Number(user.lastWeekInferences[dayIndx] ?? 0);
			chartData.max = Math.max(chartData.max, dayValue);
			chartData.min = dayIndx === 0 ? dayValue : Math.min(chartData.min, dayValue);

			chartData.values.push({
				dayName,
				value: dayValue
			});
			return chartData;
		},
		{ max: 8, min: 0, values: [] }
	);
</script>

<div class="space-y-6 p-4">
	<div class="flex items-end gap-2">
		<span class="iconify mb-[3px] size-7 text-primary-500 hugeicons--chart-01"></span>
		<p class="text-xl font-bold">Inferences last week</p>
	</div>
	<div class="flex h-48 justify-between">
		<div class="me-1 flex h-full flex-col gap-2 text-center">
			<div
				class="secondary-text-color relative flex flex-1 flex-col justify-between gap-4 text-[12px] sm:gap-5 sm:text-sm"
			>
				{#if chartData.max}
					<span class="top-0 -translate-y-2/4">{decorateNumber(chartData.max)}</span>
					<span class="top-1/4 -translate-y-2/4">
						{decorateNumber(Math.round(chartData.max * 0.75))}
					</span>
					<span class="top-2/4 -translate-y-2/4">
						{decorateNumber(Math.round(chartData.max * 0.5))}
					</span>
					<span class="top-3/4 -translate-y-2/4">
						{decorateNumber(Math.round(chartData.max * 0.25))}
					</span>
				{/if}
				<span class="bottom-0 -translate-y-2/4">0</span>
			</div>
			<span class="text-sm text-transparent sm:text-base">Y</span>
		</div>
		{#each chartData.values as { value, dayName }}
			<div class="flex h-full w-full flex-col gap-2 text-center">
				<div
					class="relative flex h-full w-full flex-1 justify-center border-b border-gray-500 px-0.5"
				>
					<span class="absolute top-0 h-[1px] w-full bg-surface-400"></span>
					<span class="absolute top-1/4 h-[1px] w-full bg-surface-400"></span>
					<span class="absolute top-2/4 h-[1px] w-full bg-surface-400"></span>
					<span class="absolute top-3/4 h-[1px] w-full bg-surface-400"></span>
					<LastWeekInferencesChartBar
						day={dayName}
						{value}
						percitage={value ? value / chartData.max : 0.007}
					/>
					<span class="absolute bottom-0 text-sm">
						{value ? decorateNumber(value) : undefined}
					</span>
				</div>
				<span class="secondary-text-color text-sm sm:text-base">{dayName}</span>
			</div>
		{/each}
	</div>
</div>
