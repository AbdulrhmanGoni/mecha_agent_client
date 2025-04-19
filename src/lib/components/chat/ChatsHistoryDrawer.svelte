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

<div>
	<Button onclick={openDrawer} size="sm" class="variant-filled-secondary flex w-fit">
		<span class="iconify size-5 hugeicons--date-time"></span>
		Chats Histories
	</Button>
</div>
<Drawer describedby="chats-histories">
	<ChatsHistory closeDrawer={drawerStore.close} />
</Drawer>
