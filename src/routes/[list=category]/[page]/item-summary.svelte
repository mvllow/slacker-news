<script>
	import Capsule from '$lib/capsule.svelte';
	import { ChatBubbleIcon } from '$lib/icons';

	/** @type {import('$lib/types').Item} */
	export let item;
	export let index;

	$: postLink = `/item/${item.id}`;
</script>

<article
	id={item.id.toString()}
	class="py-6 first:pt-0 [&:not(:last-of-type)]:border-b"
>
	<h2 class="mx-auto max-w-prose">
		<a
			href={item.domain ? item.url : postLink}
			class="break-long-words text-lg font-bold underline-offset-2 visited:text-subtle hover:underline"
			>{item.title}</a
		>
	</h2>

	<p class="mt-1.5 flex cursor-default select-none items-center gap-1.5">
		<span class="flex shrink-0 items-center text-xs font-medium text-subtle">
			{item.time_ago.replace(/(a|an)\W.*?/, '1 ')}
		</span>

		{#if item.domain}
			<span
				class="inline-flex items-center break-all font-mono text-xs font-medium text-subtle"
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
