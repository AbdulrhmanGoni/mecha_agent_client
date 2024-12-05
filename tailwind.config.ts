import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';

export default {
	darkMode: 'selector',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(
			require.resolve('@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		extend: {},
		container: {
			center: true,
			screens: {
				"2xl": "1400px",
			},
		},
	},
	plugins: [
		typography,
		forms,
		containerQueries,
		skeleton({
			themes: { preset: ["wintry"] }
		})
	]
} satisfies Config;
