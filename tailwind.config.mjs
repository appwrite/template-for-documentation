/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#FAFAFB',
					100: '#F6F6F6',
					200: '#EDEDF0',
					300: '#DCDCE4',
					400: '#C0C0CF',
					500: '#666687',
					600: '#56565C',
					700: '#2D2D31',
					800: '#19191C',
					900: '#212134'
				}
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						'code::before': {
							content: '""'
						},
						'code::after': {
							content: '""'
						},
						code: {
							backgroundColor: theme('colors.neutral.100'),
							borderRadius: theme('borderRadius.md'),
							paddingLeft: theme('spacing.1'),
							paddingRight: theme('spacing.1'),
							paddingTop: theme('spacing.0.5'),
							paddingBottom: theme('spacing.0.5'),
							fontSize: '0.875em'
						}
					}
				},
				invert: {
					css: {
						code: {
							backgroundColor: theme('colors.neutral.800')
						}
					}
				}
			})
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
