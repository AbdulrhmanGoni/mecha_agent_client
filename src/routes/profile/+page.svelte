<script lang="ts">
	import { userDataState } from '../../stores/userData.svelte';
	import SubscriptionModalButton from '$lib/components/dashboard/SubscriptionModalButton.svelte';
	import Divider from '$lib/components/shared/Divider.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import ChangePasswordSection from './ChangePasswordSection.svelte';
	import DeleteAccountSection from './DeleteAccountSection.svelte';
</script>

{#if userDataState.user}
	<div class="flex min-h-screen flex-col py-3 sm:py-8">
		<div
			class="variant-gradient-secondary-primary h-40 rounded-t-md bg-gradient-to-tr sm:h-60"
		></div>
		<div class="card flex flex-1 flex-col gap-3 px-3.5 py-2 pb-6">
			<div class="flex flex-col items-center gap-2">
				<div
					class="-mt-28 size-32 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-md sm:size-48"
				>
					<Avatar width="size-full" src={userDataState.user.avatar}>
						<span class="iconify size-full hugeicons--user-03"></span>
					</Avatar>
				</div>
				<div class="flex flex-col items-center gap-2">
					<h3
						class="relative flex items-center justify-center gap-3 text-2xl font-bold leading-6 sm:text-3xl"
					>
						{userDataState.user.name}
					</h3>
					<p class="secondary-text-color flex items-center justify-center gap-2">
						<span
							class="iconify size-5 text-black dark:text-white {userDataState.user.signingMethod ===
							'github'
								? 'hugeicons--github-01'
								: userDataState.user.signingMethod === 'google'
									? 'hugeicons--google'
									: 'hugeicons--mail-01'}"
						></span>
						{userDataState.user.email}
					</p>
					<p class="text-sm font-semibold">
						Last sign in:
						<span class="secondary-text-color">
							{userDataState.user.lastSignIn
								? new Date(userDataState.user.lastSignIn).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
										hour: '2-digit',
										minute: '2-digit'
									})
								: 'Never'}
						</span>
					</p>
					<SubscriptionModalButton
						class="badge variant-gradient-primary-tertiary relative bg-gradient-to-br text-sm uppercase sm:text-base"
						user={userDataState.user}
					>
						{userDataState.user.currentPlan} plan
					</SubscriptionModalButton>
				</div>
			</div>
			<Divider />
			<h4 class="mb-4 flex items-center gap-2 text-2xl font-bold">Account</h4>
			<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<ChangePasswordSection user={userDataState.user} />
			</div>
			<Divider />
			<h4 class="mb-4 flex items-center gap-2 text-2xl font-bold text-red-600">Danger Zone</h4>
			<DeleteAccountSection />
		</div>
	</div>
{/if}
