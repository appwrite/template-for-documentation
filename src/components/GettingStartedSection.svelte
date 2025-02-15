<script>
	import { onMount } from 'svelte';
	import Github from './icon/Github.svelte';
	import Button from '@components/Button.svelte';

	let displayGettingStarted = false;
	onMount(() => {
		displayGettingStarted = window.location.pathname === '/getting-started';
	});
</script>

{#if displayGettingStarted}
	<div class="flex flex-col gap-8">
		<div class="flex flex-col gap-3">
			<h2
				class="!m-0 text-[32px] font-medium leading-[140%] tracking-[-0.448px] text-[#2D2D31] dark:text-[#D1D1CD]"
			>
				Documentation
			</h2>

			<span
				class="text-[16px] font-normal leading-[140%] tracking-[-0.16px] text-[#56565C] dark:text-[#A3A3A0]"
			>
				This is Acme Inc's open-source design system for building consistent and reusable user
				interfaces. It is designed to prioritize collaboration, dev experience, and accessibility.
			</span>

			<div class="flex gap-2">
				<Button variant="primary" className="rounded-lg text-white px-[10px] py-[8px] h-[32px]">
					Get started
				</Button>

				<Button
					variant="secondary"
					className="rounded-lg text-white px-[10px] py-[8px] h-[32px]"
					on:click={() => {
						window.open('https://github.com/appwrite/template-for-documentation', '_blank');
					}}
				>
					<div class="flex items-center justify-center gap-[6px]">
						<Github />
						<span
							class="text-[14px] font-medium leading-[140%] tracking-[-0.063px] text-[#56565C] no-underline dark:text-[#A3A3A0]"
						>
							Github
						</span>
					</div>
				</Button>
			</div>
		</div>
		<div class="mb-8 h-[1px] bg-[#EDEDF0] dark:bg-neutral-800"></div>
	</div>
{/if}
