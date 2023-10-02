<script>
	/** @type string */
	export let href;
	export let ignoreVisited = false;
</script>

<a
	{href}
	class="inline-flex items-center justify-center gap-1.5 rounded-full bg-surface px-3 py-2 font-mono text-xs font-medium hover:bg-overlay hover:text-text [&_svg]:text-subtle"
	class:visited:text-subtle={!ignoreVisited}
>
	<slot />
</a>
