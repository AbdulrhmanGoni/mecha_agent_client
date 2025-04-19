<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	let { userMessage, user }: { userMessage: ChatMessage; user: User } = $props();
</script>

<div class="grid grid-cols-[auto_1fr] gap-2">
	<Avatar src={user.avatar} width="w-12">
		<span class="iconify size-12 hugeicons--user-circle-02"></span>
	</Avatar>
	<div class="card variant-soft space-y-2 rounded-tl-none p-4">
		<header class="flex items-center justify-between">
			<p class="font-bold">{user.name}</p>
		</header>
		<p>{userMessage.content}</p>
	</div>
</div>
