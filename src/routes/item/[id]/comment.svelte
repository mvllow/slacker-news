<script>
	import { LinkIcon } from '$lib/icons';
	import { page } from '$app/stores';

	export let author;
	export let comment;
	export let origin;
	export let parentId;

	console.log('origin from comment', origin);
	console.log({ cid: comment.id, pid: parentId });
	console.log($page.url);
</script>

{#if !comment.deleted}
	<article
		id={comment.id}
		class="target:bg-primary/5 {$page.url.hash === `#${comment.id}`
			? 'bg-primary/5'
			: ''}"
	>
		<details open class="mt-6">
			<summary class="flex items-center gap-1.5 text-subtle">
				<div class="flex w-full items-center gap-1.5 text-sm font-medium">
					<a
						href="/item/{comment.id}?parentId={parentId}&origin={origin}"
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
							<svelte:self {author} {parentId} {origin} comment={child} />
						</li>
					{/each}
				</ul>
			{/if}
		</details>
	</article>
{/if}
