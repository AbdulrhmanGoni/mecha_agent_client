<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import Button from '../shared/Button.svelte';
	import CreateApiKeyForm from './CreateApiKeyForm.svelte';

	const modalStore = getModalStore();

	function onClick() {
		modalStore.trigger({
			type: 'component',
			component: { ref: CreateApiKeyForm }
		});
	}
</script>

<Button onclick={onClick} class="variant-ghost-primary !btn-sm sm:!btn-md">
	Create API Key
	<span class="iconify size-5 hugeicons--plus-sign"></span>
</Button>
