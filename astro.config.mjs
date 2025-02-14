import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';

export default defineConfig({
	output: 'server',
	adapter: node({
		mode: 'standalone'
	}),
	markdown: {
		syntaxHighlight: 'prism',
		prism: {
			languages: ['typescript', 'javascript', 'css', 'markup', 'bash', 'jsx']
		}
	},
	integrations: [
		svelte(),
		tailwind({
			applyBaseStyles: false
		}),
		mdx()
	],
	vite: {
		resolve: {
			alias: {
				'@': '/src',
				'@components': '/src/components',
				'@layouts': '/src/layouts',
				'@styles': '/src/styles'
			}
		}
	}
});
