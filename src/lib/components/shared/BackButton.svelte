<script lang="ts">
	import Icon from '@iconify/svelte';
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

<Button {...props} onclick={back} class="variant-filled-primary {props.class}">
	<Icon icon="typcn:arrow-back" width="24" height="24" />
	Back
</Button>
