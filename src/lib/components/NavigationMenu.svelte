<script lang="ts">
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { Avatar, popup } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';

	const user = $page.data.user as User;

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'user-account',
		placement: 'bottom-end'
	};
</script>

<button use:popup={popupClick}>
	<Avatar width="w-10" src={user.avatar}>
		<Icon icon="arcticons:super-status-bar" width="48" height="48" />
	</Avatar>
</button>

<div class="card variant-filled-surface z-50 p-3" data-popup="user-account">
	<p class="px-4 py-1 text-lg font-bold">{user.name}</p>
	<hr class="!border-t-1 my-1 !border-surface-300" />
	<nav class="list-nav">
		<ul>
			<li>
				<a href="/">
					<Icon icon="typcn:home-outline" width="24" height="24" />
					<span class="flex-auto">Dashboard</span>
				</a>
			</li>
			<li>
				<a href="/agents">
					<Icon icon="hugeicons:bot" width="24" height="24" />
					<span class="flex-auto">Agents</span>
				</a>
			</li>
			<li>
				<a href="/api-keys">
					<Icon icon="flowbite:api-key-outline" width="24" height="24" />
					<span class="flex-auto">API Keys</span>
				</a>
			</li>
			<hr class="!border-t-1 !border-surface-300" />
			<li>
				<button
					onclick={() => {
						signOut();
					}}
					class="w-full text-start"
				>
					<Icon icon="ic:round-logout" width="23" height="23" />
					<span class="flex-auto">Log Out</span>
				</button>
			</li>
		</ul>
	</nav>
</div>
