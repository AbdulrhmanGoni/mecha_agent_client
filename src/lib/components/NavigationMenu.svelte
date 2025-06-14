<script lang="ts">
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { Avatar, popup } from '@skeletonlabs/skeleton';
	import { signOut } from '@auth/sveltekit/client';
	import { userDataState } from '../../stores/userData.svelte';

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'user-account',
		placement: 'bottom-end'
	};
</script>

<button use:popup={popupClick}>
	<Avatar width="w-10" src={userDataState.user?.avatar}>
		<span class="iconify size-12 hugeicons--user-circle-02"></span>
	</Avatar>
</button>

<div class="card variant-filled-surface z-50 p-3" data-popup="user-account">
	<p class="px-4 py-1 text-lg font-bold">{userDataState.user?.name}</p>
	<hr class="!border-t-1 my-1 !border-surface-300" />
	<nav class="list-nav">
		<ul>
			<li>
				<a href="/">
					<span class="iconify size-6 hugeicons--home-11"></span>
					<span class="flex-auto">Dashboard</span>
				</a>
			</li>
			<li>
				<a href="/agents">
					<span class="iconify size-6 hugeicons--bot"></span>
					<span class="flex-auto">Agents</span>
				</a>
			</li>
			<li>
				<a href="/datasets">
					<span class="iconify size-6 hugeicons--database"></span>
					<span class="flex-auto">Datasets</span>
				</a>
			</li>
			<li>
				<a href="/api-keys">
					<span class="iconify size-6 hugeicons--key-01"></span>
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
					<span class="iconify size-6 hugeicons--logout-02"></span>
					<span class="flex-auto">Log Out</span>
				</button>
			</li>
		</ul>
	</nav>
</div>
