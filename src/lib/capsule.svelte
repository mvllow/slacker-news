<script>
	/** @type string */
	export let href;
	export let ignoreVisited = false;
	export let banner = false;
	export let primary = false;
</script>

<a
	{href}
	class="inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2 [&_svg]:shrink-0"
	class:banner
	class:primary
	class:visited:text-subtle={!ignoreVisited}
>
	<slot />
</a>

<style lang="postcss">
	:not(.banner) {
		@apply font-mono text-xs font-medium;
	}
	:not(.primary) {
		@apply bg-surface hover:bg-overlay hover:text-text;
	}
	:not(.primary) :global(svg) {
		@apply text-subtle;
	}
	.banner {
		@apply border text-sm font-medium;
	}
	.banner:not(.primary) {
		@apply border border-muted/10 bg-muted/5 text-text hover:bg-muted/10;
	}
	.primary {
		@apply border-primary/10 bg-primary/5 text-primary hover:bg-primary/10;
	}
	.primary :global(svg) {
		@apply text-primary/80;
	}
</style>
