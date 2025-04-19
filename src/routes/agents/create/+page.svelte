<script>
	import AgentForm from '$lib/components/agents/AgentForm.svelte';
</script>

<AgentForm
	formTitle="Create Agent"
	submitButtonText="Create"
	submitButtonIconName="hugeicons--add-square"
	formProps={{
		method: 'POST',
		enctype: 'multipart/form-data',
		action: '/api/agents'
	}}
/>
