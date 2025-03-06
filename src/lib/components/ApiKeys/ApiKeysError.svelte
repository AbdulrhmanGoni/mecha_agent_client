<script lang="ts">
	import { apiKeysState } from '../../../stores/apiKeys.svelte';
	import Alert from '../shared/Alert.svelte';

	const props: { error: string } = $props();
</script>

<div
	class="absolute left-0 top-0 flex h-full w-full items-center justify-center text-center text-lg font-semibold"
>
	<Alert
		variant="error"
		title="Error"
		message={props.error}
		actionIconName="stash:arrow-retry"
		actionFunction={apiKeysState.refetchApiKeys}
	/>
</div>
