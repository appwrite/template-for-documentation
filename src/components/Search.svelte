<script lang="ts">
	import { onMount } from 'svelte';
	import Fuse from 'fuse.js';
	import { Search as SearchIcon } from 'lucide-svelte';

	interface SearchResult {
		title: string;
		description: string;
		group?: string;
		category?: string;
		slug: string;
		headings: string[];
	}

	let searchResults: SearchResult[] = [];
	let isSearching = false;
	let searchInput: HTMLInputElement;
	let fuse: Fuse<SearchResult>;
	let selectedIndex = -1;

	onMount(() => {
		const initialize = async () => {
			try {
				const response = await fetch('/api/search.json');
				const pages = await response.json();

				// Initialize Fuse.js
				fuse = new Fuse(pages, {
					keys: [
						{ name: 'title', weight: 1 },
						{ name: 'headings', weight: 0.8 },
						{ name: 'description', weight: 0.6 },
						{ name: 'group', weight: 0.4 },
						{ name: 'category', weight: 0.4 }
					],
					threshold: 0.3,
					includeMatches: true,
					ignoreLocation: true
				});
			} catch (error) {
				console.error('Failed to fetch search index:', error);
			}
		};

		// Add global keyboard shortcut listener
		window.addEventListener('keydown', handleGlobalKeyDown);
		initialize();

		// Return cleanup function
		return () => {
			window.removeEventListener('keydown', handleGlobalKeyDown);
		};
	});

	function handleSearch(event: Event) {
		const query = (event.target as HTMLInputElement).value.trim();
		selectedIndex = -1;

		if (!query) {
			searchResults = [];
			isSearching = false;
			return;
		}

		isSearching = true;
		const results = fuse.search(query).map((result) => result.item);
		searchResults = results.slice(0, 8); // Show more results
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			searchInput.blur();
			searchResults = [];
			isSearching = false;
			selectedIndex = -1;
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, searchResults.length - 1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, -1);
		} else if (event.key === 'Enter' && selectedIndex >= 0) {
			event.preventDefault();
			window.location.href = searchResults[selectedIndex].slug;
		}
	}

	function handleGlobalKeyDown(event: KeyboardEvent) {
		if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
			event.preventDefault();
			searchInput.focus();
		}
	}

	function handleResultClick(slug: string) {
		searchResults = [];
		isSearching = false;
		selectedIndex = -1;
		searchInput.value = '';
		searchInput.blur();
	}
</script>

<div class="relative w-full sm:w-auto">
	<div class="relative">
		<div class="pointer-events-none absolute inset-y-0 left-3 flex items-center">
			<SearchIcon class="h-5 w-5 text-neutral-400" />
		</div>
		<input
			bind:this={searchInput}
			type="search"
			placeholder="Search"
			class="w-full rounded-[10px] border border-[#EDEDF0] bg-white py-1.5 pl-10 pr-16 text-[15px] leading-[19.6px] tracking-[-0.0045em] outline-none focus:border-[#19191C] dark:border-neutral-800 dark:bg-neutral-800 dark:text-white dark:focus:border-neutral-600 sm:w-[300px]"
			on:input={handleSearch}
			on:keydown={handleKeyDown}
		/>
		<div class="pointer-events-none absolute inset-y-0 right-3 flex items-center">
			<kbd
				class="hidden rounded-[4px] border border-[#EDEDF0] bg-[#F4F4F7] px-1.5 py-0.5 text-xs text-neutral-400 dark:border-neutral-600 dark:bg-neutral-700 sm:block"
				>⌘K</kbd
			>
		</div>
	</div>

	{#if isSearching && searchResults.length > 0}
		<div
			class="absolute left-0 right-0 top-full mt-2 max-h-[calc(100vh-120px)] overflow-y-auto rounded-md border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
		>
			{#each searchResults as result, index}
				<a
					href={result.slug}
					class="block px-4 py-3 hover:bg-[#f6f6f6] dark:hover:bg-neutral-700 {index ===
					selectedIndex
						? 'bg-[#f6f6f6] dark:bg-neutral-700'
						: ''}"
					on:click={() => handleResultClick(result.slug)}
				>
					<div class="flex items-center justify-between">
						<div class="text-[15px] font-medium text-[#19191C] dark:text-white">
							{result.title}
						</div>
						{#if result.category || result.group}
							<div
								class="rounded bg-[#f0f0f1] px-2 py-0.5 text-xs text-[#56565C] dark:bg-neutral-700 dark:text-neutral-400"
							>
								{result.category || result.group}
							</div>
						{/if}
					</div>
					<div class="mt-1 line-clamp-2 text-sm text-[#56565C] dark:text-neutral-400">
						{result.description}
					</div>
				</a>
			{/each}
		</div>
	{:else if isSearching}
		<div
			class="absolute left-0 right-0 top-full mt-2 rounded-md border border-gray-200 bg-white p-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
		>
			<div class="text-sm text-[#56565C] dark:text-gray-400">No results found</div>
		</div>
	{/if}
</div>

<style>
	input[type='search']::-webkit-search-cancel-button {
		filter: brightness(0);
	}

	:global(.dark input[type='search']::-webkit-search-cancel-button) {
		filter: brightness(100);
	}
</style>
