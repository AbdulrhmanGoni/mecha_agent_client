<script>
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Alert from '../shared/Alert.svelte';

	let error = $state({
		name: '',
		message: ''
	});

	afterNavigate(({ to }) => {
		error = {
			name: to?.url.searchParams.get('error') || '',
			message: to?.url.searchParams.get('code') || ''
		};
	});
</script>

{#if error.name || error.message}
	<Alert
		variant="error"
		title={error.name}
		message={error.message}
		actionIconName="hugeicons--cancel-01"
		actionFunction={() => {
			error = {
				name: '',
				message: ''
			};
			goto(
				'/sign-in' + ($page.url.searchParams.get('isNewUser') == 'true' ? '?isNewUser=true' : ''),
				{ replaceState: true }
			);
		}}
	/>
{/if}
