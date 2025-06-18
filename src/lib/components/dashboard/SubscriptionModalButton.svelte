<script lang="ts">
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import SubscriptionCard from './SubscriptionCard.svelte';

	const { user, children, ...buttunProps }: { user: User } & HTMLButtonAttributes = $props();

	const modalStore = getModalStore();

	const modalComponent: ModalComponent = {
		ref: SubscriptionCard,
		props: { user }
	};

	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent
	};

	function onclick() {
		modalStore.trigger(modal);
	}
</script>

<button {...buttunProps} disabled={!user.subscription} {onclick}>
	{@render children?.()}
</button>
