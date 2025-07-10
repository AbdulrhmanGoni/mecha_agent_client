<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import clientFetchAPI from '$lib/functions/clientFetchAPI';
	import UserPasswordForm from '../shared/UserPasswordForm.svelte';

	const toastStore = getToastStore();

	type Props = {
		onCancel: () => void;
		onChangeSucceed: () => void;
	};
	const { onCancel, onChangeSucceed }: Props = $props();

	let loading = $state(false);

	function submitChangePasswordRequest({
		currentPassword,
		newPassword,
		confirmedPassword
	}: UserPasswordFormValues) {
		if (newPassword !== confirmedPassword) {
			toastStore.trigger({
				message: 'Passwords do not match',
				background: 'variant-filled-error',
				timeout: 5000
			});
			return;
		}

		loading = true;
		clientFetchAPI<string>({
			path: '/api/change-password',
			method: 'POST',
			body: { currentPassword, newPassword }
		})
			.then((res) => {
				toastStore.trigger({
					message: res,
					background: 'variant-filled-success',
					timeout: 5000
				});
				onChangeSucceed?.();
			})
			.catch((error) => {
				toastStore.trigger({
					message: error,
					background: 'variant-filled-error',
					timeout: 5000
				});
			})
			.finally(() => {
				loading = false;
			});
	}
</script>

<UserPasswordForm
	title="Change Password"
	onSubmit={submitChangePasswordRequest}
	withCurrentPasswordField={true}
	{loading}
	{onCancel}
/>
