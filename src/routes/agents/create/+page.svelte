<script>
	import AgentForm from '$lib/components/agents/AgentForm.svelte';
</script>

<AgentForm
	formTitle="Create Agent"
	submitButtonText="Create"
	submitButtonIconName="fluent:bot-add-20-regular"
	formProps={{
		method: 'POST',
		enctype: 'multipart/form-data',
		action: '/api/agents'
	}}
/>
