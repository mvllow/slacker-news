<script>
	export let author;
	export let parentId;
	export let comment;

	// TODO: Add permalink to comments via comment.url
</script>

{#if !comment.deleted}
	<article id={comment.id}>
		<details open class="pb-6 open:pb-0">
			<summary class="flex items-center gap-1.5 text-subtle">
				<div class="flex w-full items-center gap-1.5 text-sm font-medium">
					<a
						href="/user/{comment.user}"
						class="font-bold underline-offset-2 hover:underline"
						class:text-primary={author === comment.user}>{comment.user}</a
					>

					<a href="#{comment.id}"
						>{comment.time_ago.replace(/(a|an)\W.*?/, '1 ')}</a
					>

					<a href="/item/{comment.id}"> &mdash; Focus</a>
				</div>
			</summary>

			<div
				class="py-3 [&>*:first-child]:mt-0 [&>*]:my-3 [&>p]:leading-relaxed [&>pre]:text-sm [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2"
			>
				{@html comment.content}
			</div>

			<p class="mb-6">
				<a
					href="https://news.ycombinator.com/reply?id={comment.id}&goto=item%3Fid%3D{parentId}%23{comment.id}"
					class="inline text-sm font-medium tracking-wide text-subtle underline-offset-2 after:inline-block after:whitespace-pre after:content-['_↗'] hover:underline"
					>Reply</a
				>
			</p>

			{#if comment.comments.length > 0}
				<ul role="list">
					{#each comment.comments as child}
						<li class="border-l pl-6">
							<svelte:self comment={child} />
						</li>
					{/each}
				</ul>
			{/if}
		</details>
	</article>
{/if}
