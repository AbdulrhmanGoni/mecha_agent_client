<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	const popupClick: PopupSettings = {
		event: 'hover',
		target: 'published-agent',
		placement: 'top'
	};
</script>

<div
	use:popup={popupClick}
	class="glow variant-filled-success flex size-4 items-center justify-center rounded-full"
>
	<span class="iconify size-4 hugeicons--global"></span>
</div>

<div class="card variant-filled-surface p-2 text-sm" data-popup="published-agent">
	<p>The agent is live now</p>
	<div class="variant-filled-surface arrow"></div>
</div>

<style>
	.glow {
		animation: glow-animation 1s ease-in-out 1s infinite alternate-reverse;
	}

	@keyframes glow-animation {
		0% {
			box-shadow: 0 0 0px 0px #00ff4c;
		}

		100% {
			box-shadow: 0 0 8px 0px #00ff4c;
			scale: 1.05;
		}
	}
</style>
