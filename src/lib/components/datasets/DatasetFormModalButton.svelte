<script lang="ts">
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import DatasetForm from './DatasetForm.svelte';

	const {
		children,
		formParams,
		...buttunProps
	}: HTMLButtonAttributes & { formParams: DatasetFormProps } = $props();

	const modalStore = getModalStore();

	const modalComponent: ModalComponent = {
		ref: DatasetForm,
		props: formParams
	};

	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent
	};

	function onclick() {
		modalStore.trigger(modal);
	}
</script>

<button {...buttunProps} {onclick}>
	{@render children?.()}
</button>
