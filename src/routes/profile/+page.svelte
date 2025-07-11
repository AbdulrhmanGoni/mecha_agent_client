<script lang="ts">
	import { userDataState } from '../../stores/userData.svelte';
	import SubscriptionModalButton from '$lib/components/dashboard/SubscriptionModalButton.svelte';
	import Divider from '$lib/components/shared/Divider.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
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
					<Avatar width="size-full" src={userDataState.user?.avatar}>
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
						<span class="iconify size-5 hugeicons--mail-at-sign-02"></span>
						{userDataState.user.email}
					</p>
					<span
						class="badge variant-gradient-warning-error gap-1 bg-gradient-to-br text-sm sm:text-base"
					>
						Signed in with {userDataState.user.signingMethod == 'credentials'
							? 'Email and Password'
							: userDataState.user.signingMethod.charAt(0).toUpperCase() +
								userDataState.user.signingMethod.slice(1)}
						{#if userDataState.user.signingMethod === 'github'}
							<span class="iconify size-5 hugeicons--github-01"></span>
						{:else if userDataState.user.signingMethod === 'google'}
							<span class="iconify size-5 hugeicons--google"></span>
						{:else}
							<span class="iconify size-5 hugeicons--mail-account-02"></span>
						{/if}
					</span>
					<SubscriptionModalButton
						class="badge variant-gradient-primary-tertiary relative bg-gradient-to-br text-sm uppercase sm:text-base"
						user={userDataState.user}
					>
						{userDataState.user.currentPlan} plan
					</SubscriptionModalButton>
				</div>
			</div>
			<Divider />
		</div>
	</div>
{/if}
