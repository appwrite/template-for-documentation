<script lang="ts">
	import { socials } from '@/utils/socials.ts';
</script>

<footer
	class="relative z-30 flex w-full flex-col justify-between gap-4 border-t bg-white p-[24px_40px] text-sm dark:border-[#2C2C2F] dark:bg-[#1b1b1b] md:flex-row lg:z-50"
>
	<div class="flex items-center gap-3">
		<div>
			Deployed by <a href="https://appwrite.io" target="_blank">Appwrite</a>. Source code available
			on
			<a href="https://github.com/appwrite/template-for-documentation" target="_blank">GitHub</a>.
		</div>
	</div>

	<div class="flex justify-between gap-4">
		<div class="flex items-center gap-2">
			{#each socials as social (social.link)}
				<a aria-label={social.label} class="social-card" href={social.link} target="_blank">
					<span class="svg-wrapper">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html social.icon}
					</span>
				</a>
			{/each}
		</div>
	</div>
</footer>

<style>
	footer {
		font-size: 14px;
		font-weight: 400;
		line-height: 22px;
		margin-top: auto;
		font-style: normal;
		letter-spacing: -0.063px;
		color: var(--color-fgColor-neutral-secondary, #56565c);

		& a {
			color: #19191c;
			font-weight: 400;
			line-height: 140%;
			font-style: normal;
			letter-spacing: -0.063px;
			text-decoration: underline;
			font-size: var(--font-size-S, 14px);
		}
	}

	:global(html.dark footer) {
		color: #a3a3a0;

		& a {
			color: #e6e6e3;
		}
	}

	.social-card {
		padding: var(--space-2, 4px);
		border-radius: var(--border-radius-S, 8px);
		border: var(--border-width-S, 1px) solid var(--color-border-neutral-strong, #d8d8db);

		transition: border 0.3s ease-in-out;

		&:hover {
			border: var(--border-width-S, 1px) solid #9f9fa7;
		}
	}

	:global(html.dark .social-card) {
		border: var(--border-width-S, 1px) solid var(--color-border-neutral-strong, #56565c);
	}

	.svg-wrapper {
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
