<script lang="ts">
	import Button from '../shared/Button.svelte';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import BackButton from '../shared/BackButton.svelte';
	import Alert from '../shared/Alert.svelte';
	import { page } from '$app/state';
	import LoadingSpinner from '../shared/LoadingSpinner.svelte';
	import AgentAvatar from './AgentAvatar.svelte';

	type AgentFormProps = {
		formTitle: string;
		onFormSubmit?: (e: SubmitFormEvent) => void;
		defaults?: Partial<Omit<Agent, 'id' | 'dataset' | 'createdAt'>>;
		formProps?: HTMLFormAttributes;
		submitButtonText: string;
		submitButtonIconName?: string;
		isLoading?: boolean;
	};

	const props: AgentFormProps = $props();

	const responseSyntaxOptions = ['markdown'];

	const error = $derived(page.url.searchParams.get('error'));
</script>

<div class="mt-8 space-y-5">
	<div class="flex items-center justify-between gap-2">
		<h3 class="flex flex-1 items-center text-3xl font-bold">{props.formTitle}</h3>
		<BackButton />
	</div>
	<form
		onsubmit={props.onFormSubmit}
		{...props.formProps}
		class={'card flex flex-col gap-4 p-4 ' + props.formProps?.class || ''}
	>
		<div class="flex flex-col gap-2 sm:flex-row">
			<label class="label flex-1">
				<span class="font-semibold">Agent Name</span>
				<input
					value={props.defaults?.agentName}
					class="input variant-form-material"
					required
					minlength="3"
					maxlength="80"
					name="agentName"
					type="text"
					placeholder="Give your agent a name"
					disabled={props.isLoading}
				/>
				<p id="agent-name-error-message" class="text-red-600"></p>
			</label>
			<AgentAvatar defaultAvatar={props.defaults?.avatar} isLoading={props.isLoading} />
		</div>
		<label class="label">
			<span class="font-semibold">Description</span>
			<textarea
				value={props.defaults?.description}
				class="input variant-form-material"
				name="description"
				rows="3"
				required
				placeholder="Write a description for your agent"
				disabled={props.isLoading}
			></textarea>
		</label>
		<label class="label">
			<span class="font-semibold">System Instructions</span>
			<textarea
				value={props.defaults?.systemInstructions}
				class="input variant-form-material"
				name="systemInstructions"
				rows="5"
				placeholder="Give your agent more instructions to customized its behavior"
				disabled={props.isLoading}
			></textarea>
		</label>
		<label class="label">
			<span class="font-semibold">Don't know response</span>
			<textarea
				value={props.defaults?.dontKnowResponse}
				class="input variant-form-material"
				name="dontKnowResponse"
				rows="2"
				placeholder="What the agent should respond if it doesn't find a suitable response"
				disabled={props.isLoading}
			></textarea>
		</label>
		<label class="label flex-1">
			<span class="font-semibold">Greeting Message</span>
			<input
				value={props.defaults?.greetingMessage}
				class="input variant-form-material"
				minlength="10"
				maxlength="80"
				name="greetingMessage"
				type="text"
				placeholder="How does your agent greet users?"
				disabled={props.isLoading}
			/>
			<p id="agent-name-error-message" class="text-red-600"></p>
		</label>
		<label class="label">
			<span class="font-semibold">Response Syntax</span>
			<select disabled={props.isLoading} name="responseSyntax" class="select variant-form-material">
				<option value="none">none</option>
				{#each responseSyntaxOptions as option}
					<option selected={option === props.defaults?.responseSyntax} value={option}>
						{option}
					</option>
				{/each}
			</select>
		</label>
		<Button
			type="submit"
			class="variant-filled-primary self-end {props.isLoading ? 'cursor-not-allowed' : ''}"
			disabled={props.isLoading}
		>
			{#if props.isLoading}
				<LoadingSpinner sizeClass="size-5" />
			{:else if props.submitButtonIconName}
				<span class={`iconify size-5 ${props.submitButtonIconName}`}></span>
			{/if}
			{props.submitButtonText}
		</Button>
		{#if error}
			<Alert title="Create Agent Error" message={error} variant="error" />
		{/if}
	</form>
</div>
