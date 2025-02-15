<script lang="ts">
	import { onMount } from 'svelte';
	import { Sun, Moon, Menu, Github } from 'lucide-svelte';
	import Search from './Search.svelte';
	import { layoutStore } from '../stores/layout';

	let isDark = false;

	onMount(() => {
		// Initialize isDark state from current class
		isDark = document.documentElement.classList.contains('dark');

		// Create mutation observer to keep isDark in sync
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.attributeName === 'class') {
					isDark = document.documentElement.classList.contains('dark');
				}
			});
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class']
		});

		return () => observer.disconnect();
	});

	const toggleTheme = () => {
		const newTheme = isDark ? 'light' : 'dark';
		localStorage.setItem('theme', newTheme);
		const applyThemeChange = () => {
			document.documentElement.classList.toggle('dark', newTheme === 'dark');
		};

		if (document.startViewTransition) {
			document.startViewTransition(applyThemeChange);
		} else {
			applyThemeChange();
		}
	};

	const toggleRightSidebar = () => {
		const sidebar = document.getElementById('right-sidebar');
		if (sidebar) {
			sidebar.classList.toggle('translate-x-full');
			layoutStore.toggleRightSidebar();
		}
	};
</script>

<header
	class="fixed left-0 right-0 top-0 z-50 h-14 border-b border-[#EDEDF0] bg-white dark:border-neutral-800 dark:bg-[#121212]"
>
	<div class="flex h-full items-center justify-between px-4 lg:pl-7">
		<a href="/" class="flex items-center gap-2">
			<img src="/logo.svg" alt="Logo" class="h-8 w-8" />
			<div class="flex items-center gap-2">
				<span class="font-medium text-[#19191C] dark:text-white">Acme Inc.</span>
				<span class="hidden text-gray-400 sm:inline">Documentation</span>
			</div>
		</a>

		<div class="flex items-center gap-2 sm:gap-4">
			<div class="hidden sm:block">
				<Search />
			</div>

			<a
				href="https://github.com/appwrite/template-for-documentation"
				target="_blank"
				rel="noopener noreferrer"
				class="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-neutral-800"
				aria-label="View on GitHub"
			>
				<Github class="h-5 w-5 text-gray-600 dark:text-gray-400" />
			</a>

			<button
				on:click={toggleTheme}
				class="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-neutral-800"
				aria-label="Toggle theme"
			>
				{#if isDark}
					<Sun class="h-5 w-5 text-gray-600 dark:text-gray-400" />
				{:else}
					<Moon class="h-5 w-5 text-gray-600" />
				{/if}
			</button>

			<button
				on:click={toggleRightSidebar}
				class="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 lg:hidden"
				aria-label="Toggle table of contents"
			>
				<Menu class="h-5 w-5 text-gray-600 dark:text-gray-400" />
			</button>
		</div>
	</div>
</header>
