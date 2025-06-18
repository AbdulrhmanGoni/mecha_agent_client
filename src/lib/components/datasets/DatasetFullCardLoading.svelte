<script>
	import Divider from '../shared/Divider.svelte';
</script>

<div class="card flex w-full flex-col flex-wrap gap-3 px-3 py-4 lg:flex-nowrap">
	<div class="flex flex-wrap justify-between gap-3">
		<div class="flex-1 space-y-2">
			<div class="flex items-center gap-2">
				<span class="placeholder size-8"></span>
				<span class="placeholder h-8 w-[75%] sm:w-[65%]"></span>
			</div>
			<span class="placeholder h-5 w-full"></span>
		</div>
		<div class="flex gap-2">
			<span class="placeholder size-7 sm:size-8"></span>
			<span class="placeholder size-7 sm:size-8"></span>
		</div>
	</div>
	<Divider />
	<div class="flex items-center gap-3 font-medium">
		<span class="placeholder size-7"></span>
		<span class="placeholder h-5 w-28"></span>
		<span class="placeholder h-6 w-8 rounded-full"></span>
		<span class="placeholder ms-auto size-7 sm:h-8 sm:w-36"></span>
	</div>
	<Divider />
	<div class="flex items-center gap-3">
		<span class="placeholder size-7"></span>
		<span class="placeholder h-5 w-28"></span>
		<span class="placeholder h-5 w-28"></span>
	</div>
</div>
