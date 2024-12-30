<script lang="ts">
	import Icon from '@iconify/svelte';
	import Button from './Button.svelte';

	const back = () => {
		window.history.back();
	};

	const props: CustomButtonProps = $props();
</script>

<Button {...props} onclick={back} class="variant-filled-primary {props.class}">
	<Icon icon="typcn:arrow-back" width="24" height="24" />
	Back
</Button>
