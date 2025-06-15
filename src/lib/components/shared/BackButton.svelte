<script lang="ts">
	import Button from './Button.svelte';
	import { goto } from '$app/navigation';

	const { target, ...props }: CustomButtonProps & { target?: string } = $props();

	const back = () => {
		if (target) {
			goto(target);
		} else {
			window.history.back();
		}
	};
</script>

<Button {...props} onclick={back} class="variant-filled-primary !btn-sm sm:!btn-md {props.class}">
	<span class="iconify size-6 hugeicons--link-backward"> </span>
	Back
</Button>
