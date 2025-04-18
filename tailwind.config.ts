import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { customTheme } from "./src/lib/constants/customTheme"
import { addIconSelectors } from "@iconify/tailwind";

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
				"xl": "1000px",
			},
		},
	},
	plugins: [
		typography,
		forms,
		containerQueries,
		addIconSelectors({ prefixes: ["hugeicons"] }),
		skeleton({
			themes: { custom: [customTheme] },
		})
	]
} satisfies Config;
