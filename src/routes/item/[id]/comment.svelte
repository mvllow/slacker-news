<script>
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
						><svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-3.5 w-3.5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
							/>
						</svg></a
					>
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
