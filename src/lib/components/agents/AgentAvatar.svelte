<script lang="ts">
	import { Avatar, getToastStore } from '@skeletonlabs/skeleton';
	import AgentFallbackAvatar from './AgentFallbackAvatar.svelte';
	import { createUploadThing } from '$lib/functions/uploadthing';
	import Button from '../shared/Button.svelte';
	import type { Writable } from 'svelte/store';

	type Props = {
		defaultAvatar?: Agent['avatar'];
		disabled?: boolean;
		avatarIsBeingUploaded: Writable<boolean>;
	};

	let { avatarIsBeingUploaded, ...props }: Props = $props();

	let avatarRemoved = $state(false);
	let selectedAvatarUrl = $state('');
	let avatarFileElement: HTMLInputElement | null = $state(null);
	let uploadProgress = $state(0);

	const allowedImagesTypes = ['svg+xml', 'png', 'jpeg', 'webp'];
	const uploadedAvatarsCache: Record<string, string> = {};

	const toastStore = getToastStore();

	const { isUploading, startUpload } = createUploadThing('imageUploader', {
		onClientUploadComplete([file]) {
			const cacheRecordKey = `${file.name}-${file.size}-${file.type}`;
			uploadedAvatarsCache[cacheRecordKey] = selectedAvatarUrl = file.ufsUrl;
			undoAvatarRemoving();
			uploadProgress = 0;
		},
		onUploadError() {
			toastStore.trigger({
				message: 'We couldnt upload the avatar you picked, please try again',
				background: 'variant-filled-error'
			});
			selectedAvatarUrl = '';
			uploadProgress = 0;
		},
		onUploadProgress(progress) {
			uploadProgress = progress;
		}
	});

	isUploading.subscribe((state) => avatarIsBeingUploaded.set(state));

	const MAX_FILE_SIZE = 1024 * 1024 * 2; // 2MB

	function validateAvatarFile(file: File) {
		if (!allowedImagesTypes.some((type) => file?.type == `image/${type}`)) {
			toastStore.trigger({
				message: "The avatar must be either 'svg', 'png', 'jpeg' or 'webp' image",
				background: 'variant-filled-error'
			});
			return false;
		}

		if (file.size > MAX_FILE_SIZE) {
			toastStore.trigger({
				message:
					'The file you picked is to large for an avatar, please try compress it or bring another one',
				background: 'variant-filled-error'
			});
			return false;
		}

		return true;
	}

	async function onAvatarSelect(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const avatarFile = e.currentTarget.files?.[0];
		if (avatarFile) {
			if (validateAvatarFile(avatarFile)) {
				const cacheRecordKey = `${avatarFile.name}-${avatarFile.size}-${avatarFile.type}`;
				if (uploadedAvatarsCache[cacheRecordKey]) {
					selectedAvatarUrl = uploadedAvatarsCache[cacheRecordKey];
					return;
				}
				startUpload([avatarFile]);
			} else {
				clearAvatarFileInput();
			}
		}

		selectedAvatarUrl = '';
	}

	function setRemoveAvatarState(state: boolean) {
		avatarRemoved = state;
		const avatarRemovedCheckbox = document.getElementById(
			'avatar-removed'
		) as HTMLInputElement | null;
		if (avatarRemovedCheckbox) avatarRemovedCheckbox.checked = state;
	}

	function clearAvatarFileInput() {
		if (avatarFileElement) {
			avatarFileElement.value = '';
		}
	}

	function onAvatarRemoving() {
		clearAvatarFileInput();
		selectedAvatarUrl = '';
		if (props.defaultAvatar) {
			setRemoveAvatarState(true);
		}
	}

	function undoAvatarRemoving() {
		setRemoveAvatarState(false);
	}
</script>

<div class="relative flex gap-2">
	<label class="label flex flex-1 flex-col justify-between">
		<span class="font-semibold">
			Agent Avatar
			<strong class="text-sm text-red-600">{avatarRemoved ? '(Removed)' : ''}</strong>
		</span>
		<Button
			class="variant-ghost-primary !mb-[5px] !mt-0 h-[34px]"
			onclick={() => avatarFileElement?.click()}
			disabled={props.disabled}
		>
			Pick
		</Button>
		<input
			id="agent-avatar"
			bind:this={avatarFileElement}
			type="file"
			onchange={onAvatarSelect}
			disabled={props.disabled}
			hidden
		/>
		<input
			name="avatar"
			type="text"
			value={selectedAvatarUrl || props.defaultAvatar || ''}
			hidden
		/>
	</label>
	<div class="relative flex items-end {avatarRemoved || props.disabled ? 'opacity-50' : ''}">
		<Avatar src={selectedAvatarUrl || props.defaultAvatar} width="size-12 sm:size-16">
			<AgentFallbackAvatar />
		</Avatar>
		{#if $isUploading}
			<div
				class="absolute z-50 flex size-12 h-full select-none items-center justify-center rounded-full bg-black/40 text-center text-xs sm:size-16"
			>
				Uploading... <br />
				%{uploadProgress}
			</div>
		{/if}
	</div>
	{#if props.defaultAvatar || selectedAvatarUrl}
		<input
			class="hidden"
			id="avatar-removed"
			name="removeAvatar"
			type="checkbox"
			disabled={props.disabled}
		/>
		<button
			type="button"
			onclick={avatarRemoved ? undoAvatarRemoving : onAvatarRemoving}
			class="absolute right-0 top-0 {props.disabled
				? 'cursor-not-allowed'
				: 'cursor-pointer'} {props.disabled ? 'opacity-50' : avatarRemoved ? '!opacity-100' : ''}"
			disabled={props.disabled}
		>
			{#if avatarRemoved}
				<span class="iconify size-6 hugeicons--undo-03"></span>
			{:else}
				<span class="iconify size-6 hugeicons--cancel-01"></span>
			{/if}
		</button>
	{/if}
</div>
