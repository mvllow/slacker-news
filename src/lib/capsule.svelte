<script>
	/** @type string */
	export let href;
	export let ignoreVisited = false;
</script>

<a
	{href}
	class="inline-flex items-center justify-center gap-1.5 rounded-full bg-surface py-2 pl-2 pr-3 font-mono text-xs font-medium [&_svg]:text-subtle"
	class:visited:text-subtle={!ignoreVisited}
>
	<slot />
</a>
