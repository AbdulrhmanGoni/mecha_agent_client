<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	const { user }: { user: User } = $props();

	const max = Number(user.todayInference.max);
	const value = Number(user.todayInference.current);
	const percenage = (value / max) * 100;
</script>

<div class="flex flex-col items-center justify-center gap-3 px-3 py-6">
	<p class="text-center text-xl font-semibold">Today's inferences</p>
	<ProgressRadial
		width="w-28"
		stroke={50}
		meter={percenage < 70
			? 'stroke-primary-500'
			: percenage < 90
				? 'stroke-orange-500'
				: 'stroke-red-500'}
		track={percenage < 70
			? 'stroke-primary-500/30'
			: percenage < 90
				? 'stroke-orange-500/30'
				: 'stroke-red-500/30'}
		strokeLinecap="butt"
		value={percenage}
		font={150}
	>
		{value}
	</ProgressRadial>
	<span class="badge variant-gradient-primary-secondary bg-gradient-to-br">Max {max}</span>
</div>
