<script lang="ts">
	import Button from '../shared/Button.svelte';
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import ChatsHistory from './ChatsHistory.svelte';

	const drawerStore = getDrawerStore();

	function openDrawer() {
		drawerStore.open({
			width: 'w-11/12 sm:w-[400px]'
		});
	}
</script>

<Button onclick={openDrawer} size="sm" class="variant-filled-surface flex w-fit gap-2">
	<span class="iconify size-5 hugeicons--date-time"></span>
	Chats Histories
</Button>
<Drawer describedby="chats-histories">
	<ChatsHistory closeDrawer={drawerStore.close} />
</Drawer>
