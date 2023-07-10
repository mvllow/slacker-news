/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			aria: {
				page: 'current="page"',
			},
			spacing: {
				'page-gutter': 'var(--page-gutter)',
			},
			maxWidth: {
				shell: 'var(--shell-width)',
				content: 'var(--content-width)',
			},
			colors: {
				base: 'hsl(var(--color-base) / <alpha-value>)',
				surface: 'hsl(var(--color-surface) / <alpha-value>)',
				subtle: 'hsl(var(--color-subtle) / <alpha-value>)',
				text: 'hsl(var(--color-text) / <alpha-value>)',
				primary: 'hsl(var(--color-primary) / <alpha-value>)',
			},
			borderColor: (theme) => ({
				DEFAULT: theme('colors.surface', 'currentColor'),
			}),
			ringColor: {
				DEFAULT: 'hsl(var(--color-primary) / 20)',
			},
		},
	},
	plugins: [],
};
