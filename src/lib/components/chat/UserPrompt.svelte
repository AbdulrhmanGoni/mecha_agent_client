<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	let { userMessage, user }: { userMessage: ChatMessage; user: User } = $props();
</script>

<div class="ms-auto grid w-fit min-w-56 grid-cols-[1fr_auto] gap-2">
	<div class="card variant-soft space-y-2 rounded-tr-none p-4">
		<p class="flex w-fit items-center justify-end font-bold">{user.name}</p>
		<p class="w-fit">{userMessage.content}</p>
	</div>
	<Avatar src={user.avatar} width="w-12">
		<span class="iconify size-12 hugeicons--user-circle-02"></span>
	</Avatar>
</div>
