<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
	export let disabled = false;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let className = '';

	const variantClasses = {
		primary:
			'bg-black text-white hover:bg-gray-900 active:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-neutral-100 dark:active:bg-gray-200',
		secondary:
			'bg-white text-black border border-[#EDEDF0] hover:bg-gray-50 active:bg-gray-100 dark:bg-neutral-800 dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700 dark:active:bg-gray-600',
		tertiary:
			'bg-transparent text-black hover:bg-gray-50 active:bg-gray-100 dark:text-white dark:hover:bg-neutral-800 dark:active:bg-gray-700'
	};

	$: classes = `
    ${variantClasses[variant]}
    h-[26px]
    py-5 px-6
    rounded-lg
    text-[15px]
    leading-none
    font-medium
    flex items-center justify-center
    transition-colors
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white dark:focus:ring-offset-gray-900
    disabled:opacity-50 disabled:cursor-not-allowed
    ${
			variant === 'primary'
				? 'disabled:hover:bg-black disabled:active:bg-black dark:disabled:hover:bg-white dark:disabled:active:bg-white'
				: ''
		}
      ${className}
  `;
</script>

<button {type} {disabled} class={classes} on:click>
	<slot />
</button>

<style>
	:global(.hover) {
		@apply bg-gray-900 dark:bg-neutral-100;
	}
	:global(.pressed) {
		@apply bg-gray-800 dark:bg-neutral-200;
	}
	:global(.focus) {
		@apply ring-2 ring-black ring-offset-2 dark:ring-white dark:ring-offset-gray-900;
	}
</style>
