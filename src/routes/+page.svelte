<script lang="ts">
	import InfoBox from '$lib/components/dashboard/InfoBox.svelte';
	import ErrorPage from '$lib/components/shared/ErrorPage.svelte';
	import { userDataState } from '../stores/userData.svelte';
</script>

{#if userDataState.error}
	<ErrorPage
		iconName="hugeicons--rss-error"
		errorMessage={userDataState.error}
		title="Failed to fetch user data"
		hideBackButton
		retryFn={() => {
			window.location.reload();
		}}
	/>
{:else}
	<div class="grid grid-cols-8 gap-3">
		{#if userDataState.isFetching}
			<div class="placeholder col-span-4 h-28 rounded-lg md:col-span-2"></div>
			<div class="placeholder col-span-4 h-28 rounded-lg md:col-span-2"></div>
			<div class="placeholder col-span-4 h-28 rounded-lg md:col-span-2"></div>
			<div class="placeholder col-span-4 h-28 rounded-lg md:col-span-2"></div>
		{:else if userDataState.user}
			<div class="col-span-4 md:col-span-2">
				<InfoBox
					title="Agents"
					value={userDataState.user.agentsCount}
					icon="hugeicons--bot text-tertiary-500"
					goTo="/agents"
				/>
			</div>
			<div class="col-span-4 md:col-span-2">
				<InfoBox
					title="Published Agents"
					value={userDataState.user.publishedAgents}
					icon="hugeicons--internet text-secondary-500"
				/>
			</div>
			<div class="col-span-4 md:col-span-2">
				<InfoBox
					title="Datasets"
					value={userDataState.user.datasetsCount}
					icon="hugeicons--database text-success-500"
					goTo="/datasets"
				/>
			</div>
			<div class="col-span-4 md:col-span-2">
				<InfoBox
					title="API Keys"
					value={userDataState.user.apiKeysCount}
					icon="hugeicons--key-01 text-warning-500"
					goTo="/api-keys"
				/>
			</div>
		{/if}
	</div>
{/if}
