<script>
	import { LinkIcon } from '$lib/icons';

	export let author;
	export let parentId;
	export let comment;
</script>

{#if !comment.deleted}
	<article id={comment.id}>
		<details open class="mt-6 overflow-hidden rounded-md">
			<summary class="flex items-center gap-1.5 text-subtle">
				<div class="flex w-full items-center gap-1.5 text-sm font-medium">
					<a
						href="/item/{comment.id}?from={parentId}"
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

			<div class="formatted-content">
				{@html comment.content}
			</div>

			{#if comment.comments.length > 0}
				<ul role="list">
					{#each comment.comments as child}
						<li class="border-l pl-6">
							<svelte:self {author} {parentId} comment={child} />
						</li>
					{/each}
				</ul>
			{/if}
		</details>
	</article>
{/if}
