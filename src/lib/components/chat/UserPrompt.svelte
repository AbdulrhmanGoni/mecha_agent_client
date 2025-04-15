<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	let { userMessage, user }: { userMessage: ChatMessage; user: User } = $props();
</script>

<div class="grid grid-cols-[auto_1fr] gap-2">
	<Avatar src={user.avatar} width="w-12">
		<Icon icon="arcticons:super-status-bar" width="48" height="48" />
	</Avatar>
	<div class="card variant-soft space-y-2 rounded-tl-none p-4">
		<header class="flex items-center justify-between">
			<p class="font-bold">{user.name}</p>
		</header>
		<p>{userMessage.content}</p>
	</div>
</div>
