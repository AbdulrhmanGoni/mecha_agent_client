<script lang="ts">
	import Button from './Button.svelte';

	const { ...props }: CustomButtonProps = $props();

	const back = () => {
		window.history.back();
	};
</script>

<Button {...props} onclick={back} class="variant-filled-primary !btn-sm sm:!btn-md {props.class}">
	<span class="iconify size-6 hugeicons--link-backward"> </span>
	Back
</Button>
