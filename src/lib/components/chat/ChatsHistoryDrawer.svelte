<script lang="ts">
	import Icon from '@iconify/svelte';
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
		<Icon icon="material-symbols:history-rounded" width="24" height="24" />
		Chats Histories
	</Button>
</div>
<Drawer describedby="chats-histories">
	<ChatsHistory closeDrawer={drawerStore.close} />
</Drawer>
