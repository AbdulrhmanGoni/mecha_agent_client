<script lang="ts">
	import { MechaAgentChat } from '@mecha_agent_inference_client/sveltekit';
	import { page } from '$app/state';
</script>

<div class="flex flex-1 flex-col items-center justify-center">
	<MechaAgentChat agentId={page.params.agentId} />
</div>
