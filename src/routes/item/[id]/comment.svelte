<script>
	import Content from '$lib/content.svelte';
	import { LinkIcon } from '$lib/icons';
	import { page } from '$app/stores';

	/** @type {import('$lib/types').Item} */
	export let comment;

	/** @type string */
	export let author;

	/** @type string */
	export let rootId;

	$: isTarget = $page.url.hash === `#${comment.id}`;
</script>

{#if !comment.deleted}
	<article id={comment.id.toString()} class:isTarget>
		<details open class="mt-6">
			<summary class="flex items-center gap-1.5 text-subtle">
				<div class="flex w-full items-center gap-1.5 text-sm font-medium">
					<a
						href="/item/{comment.id}?rootId={rootId}"
						class="font-bold"
						class:text-text={author !== comment.user}
						class:text-primary={author === comment.user}
						>{comment.user}&nbsp;
						<span class="font-medium text-subtle"
							>{comment.time_ago.replace(/(a|an)\W.*?/, '1 ')}</span
						></a
					>

					<div class="flex-1" />

					<a
						href="#{comment.id}"
						class="flex h-6 w-6 items-center justify-center rounded-full bg-surface"
					>
						<LinkIcon size={14} />
					</a>
				</div>
			</summary>

			<Content content={comment.content} />

			{#if comment.comments.length > 0}
				<ul role="list">
					{#each comment.comments as child}
						<li class="border-l pl-6">
							<svelte:self {author} {rootId} comment={child} />
						</li>
					{/each}
				</ul>
			{/if}
		</details>
	</article>
{/if}

<style lang="postcss">
	.isTarget > details > summary,
	.isTarget > details > .formatted-content {
		@apply bg-primary/5;
	}
	.isTarget > details > summary {
		@apply -mx-2 -mt-2 border-t-2 border-primary/50 px-2 pt-2;
	}
	.isTarget > details > .formatted-content {
		@apply -mx-2 -mb-2 px-2 pb-2;
	}
	/* HACK: Replace margin with padding on first content element
	 * to maintain target background */
	.isTarget > details > .formatted-content :global(> *) {
		@apply mt-0 pt-3;
	}
</style>
