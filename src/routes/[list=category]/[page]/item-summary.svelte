<script>
	import Capsule from '$lib/capsule.svelte';
	import { ChatBubbleIcon } from '$lib/icons';

	/** @type {import('$lib/types').Item} */
	export let item;
	export let index;

	$: postLink = `/item/${item.id}`;
</script>

<article
	class="py-6 first:pt-0 [&:not(:last-child)]:border-b"
	id={item.id.toString()}
>
	<h2 class="max-w-lg">
		<a
			href={item.domain ? item.url : postLink}
			class="text-lg font-bold visited:text-subtle">{item.title}</a
		>
	</h2>

	<p class="mt-1.5 flex cursor-default select-none items-center gap-1.5">
		<time class="flex items-center text-xs font-medium text-subtle">
			{item.time_ago.replace(/(a|an)\W.*?/, '1 ')}
		</time>

		{#if item.domain}
			<span
				class="inline-flex items-center font-mono text-xs font-medium text-subtle"
				>({item.domain})
			</span>
		{/if}
	</p>

	<div class="mt-6 flex flex-wrap items-center gap-1.5">
		<Capsule href={postLink}>
			<ChatBubbleIcon size={16} />
			<p>
				{item.comments_count}
				{item.comments_count === 1 ? 'comment' : 'comments'}
			</p>
		</Capsule>
	</div>
</article>
