<script lang="ts">
	import { onMount } from 'svelte';
	import { agentPageState } from '../../../stores/agentPage.svelte';
	import { agentsState } from '../../../stores/agents.svelte';

	const { agent }: { agent: Agent } = $props();

	const statusVariants: Record<Dataset['status'], string> = {
		processing: 'variant-filled-warning',
		unprocessed: 'variant-filled-error',
		processed: 'variant-filled-success'
	};

	onMount(() => {
		if (agent.dataset?.id && agent.dataset.status !== 'processed') {
			const eventSource = new EventSource('/api/sse/dataset-status/' + agent.dataset?.id);

			eventSource.onmessage = (event) => {
				if (agentPageState.agent?.dataset?.status) {
					agentPageState.agent.dataset.status = event.data;

					if (agentsState.agents.length) {
						agentsState.agents.map((agent) => {
							if (agent.dataset?.id === agent.dataset?.id) {
								agent.dataset!.status = event.data;
							}
							return agent;
						});
					}
				}
			};

			eventSource.onerror = () => {
				eventSource.close();
			};

			return () => {
				eventSource.close();
			};
		}
	});
</script>

<span class="me-2 font-bold">Status:</span>
<span class="{agent.dataset?.status ? statusVariants[agent.dataset?.status] : ''} badge">
	{agent.dataset?.status}
</span>
