<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	let { showPassword = $bindable() }: { showPassword: boolean } = $props();

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'toogle-password-visibility',
		placement: 'top'
	};
</script>

<button
	type="button"
	class="relative flex"
	aria-label={showPassword ? 'Hide Password' : 'Show Password'}
	onclick={() => {
		showPassword = !showPassword;
	}}
	use:popup={popupHover}
>
	{#if !showPassword}
		<span
			class="absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -rotate-45 bg-black dark:bg-white"
		>
		</span>
	{/if}
	<span class="iconify size-5 hugeicons--eye"></span>
</button>

<div
	class="variant-filled-surface rounded-md p-1.5 text-sm"
	data-popup="toogle-password-visibility"
>
	<p>{showPassword ? 'Password is visible' : 'Password is hidden'}</p>
	<div class="variant-filled-surface arrow"></div>
</div>
