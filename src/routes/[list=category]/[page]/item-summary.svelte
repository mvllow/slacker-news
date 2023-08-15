<script>
	/** @type {import('$lib/types').Item} */
	export let item;
	export let index;
</script>

<div class="border-b">
	<a id={item.id.toString()} href="/item/{item.id}">
		<article class="my-3 w-full space-y-1.5 rounded-lg p-3 hover:bg-surface/50">
			<h1 class="max-w-lg text-lg font-semibold visited:text-subtle">
				{item.title}
			</h1>

			<p class="flex items-center font-mono text-xs font-medium text-subtle">
				{item.comments_count}
				{item.comments_count === 1 ? 'comment' : 'comments'}, {item.time_ago.replace(
					/(a|an)\W.*?/,
					'1 ',
				)}
				{#if item.domain}
					&mdash;&nbsp;<a href={item.url} class="truncate hover:underline"
						>{item.domain}</a
					>
				{/if}
			</p>
		</article>
	</a>
</div>
