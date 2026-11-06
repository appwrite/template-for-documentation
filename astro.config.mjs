import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import { rehypeCopyButton } from './src/plugins/code-blocks.js';

export default defineConfig({
	output: 'server',
	adapter: node({
		mode: 'standalone'
	}),
	markdown: {
		syntaxHighlight: 'prism',
		prism: {
			languages: ['typescript', 'javascript', 'css', 'markup', 'bash', 'jsx']
		},
		rehypePlugins: [rehypeCopyButton]
	},
	integrations: [svelte(), mdx()],
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
