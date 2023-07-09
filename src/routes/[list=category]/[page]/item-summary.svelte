<script>
	import Capsule from '$lib/capsule.svelte';
	import { ChatBubbleIcon } from '$lib/icons';

	/** @type {{ id: number, domain: string, url: string, user: string, title: string, time_ago: string, points: number, comments_count: number }} */
	export let item;
	export let index;
	/** @type string */
	export let origin;
</script>

<article class="py-6 first:pt-0" id={item.id.toString()}>
	<h2 class="max-w-lg">
		<a
			href={item.domain ? item.url : `/item/${item.id}/?origin=${origin}`}
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

	<div class="mt-3 flex flex-wrap items-center gap-1.5">
		<Capsule href={`/item/${item.id}/?origin=${origin}`}>
			<ChatBubbleIcon size={16} />

			<p>
				{item.comments_count}
				{item.comments_count === 1 ? 'comment' : 'comments'}
			</p>
		</Capsule>
	</div>
</article>
