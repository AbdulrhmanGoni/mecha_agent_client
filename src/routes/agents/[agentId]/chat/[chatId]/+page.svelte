<script lang="ts">
	import { page } from '$app/stores';
	import { agentPageState, fetchAgentState } from '../../../../../stores/agentPage.svelte';
	import AgentPageError from '$lib/components/agents/AgentPageError.svelte';
	import AgentChattingPageLoading from '$lib/components/chat/AgentChattingPageLoading.svelte';
	import AgentChatting from '$lib/components/chat/AgentChatting.svelte';
	import { userDataState } from '../../../../../stores/userData.svelte';

	fetchAgentState($page.params.agentId);
</script>

{#if agentPageState.isFetching}
	<AgentChattingPageLoading />
{:else if agentPageState.error}
	<AgentPageError errorMessage={agentPageState.error} />
{:else if userDataState.user && agentPageState.agent}
	<AgentChatting
		user={userDataState.user}
		agent={agentPageState.agent}
		chatId={$page.params.chatId}
	/>
{/if}
