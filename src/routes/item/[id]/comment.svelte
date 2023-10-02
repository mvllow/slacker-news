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
			<summary class="flex items-center gap-1.5 text-muted">
				<div class="flex w-full items-center gap-1.5">
					<a
						href="/item/{comment.id}?rootId={rootId}"
						class="text-sm decoration-text hover:underline {author ===
						comment.user
							? 'font-bold text-primary'
							: 'font-medium text-subtle'}"
						>{comment.user}&nbsp;
						<span class="text-xs font-medium text-muted"
							>{comment.time_ago.replace(/(a|an)\W.*?/, '1 ')}</span
						></a
					>

					<div class="flex-1" />

					<a
						href="#{comment.id}"
						class="flex h-6 w-6 items-center justify-center rounded-full text-muted hover:bg-overlay hover:text-text"
					>
						<LinkIcon size={14} />
					</a>
				</div>
			</summary>

			<div class="ml-1 border-l pl-5" class:isTarget>
				<Content content={comment.content} />

				{#if comment.comments.length > 0}
					<ul role="list">
						{#each comment.comments as child}
							<li>
								<svelte:self {author} {rootId} comment={child} />
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</details>
	</article>
{/if}

<style lang="postcss">
	.isTarget {
		@apply border-primary/50;
	}
</style>
