<script>
	import { formatContent } from '$lib/parser';

	export let content = '';
</script>

<div class="post">
	{@html formatContent(content)}
</div>

<style>
	.post {
		display: grid;

		/*
		 * Prevent long words from overflowing the container.
		 * http://localhost:5173/item/36714868
		 */
		overflow-wrap: break-word;
		word-break: break-word;
	}

	.post :global(> *:not(:empty)) {
		margin-top: theme('spacing.3');
		max-width: 100%;
	}

	.post :global(> p) {
		line-height: theme('lineHeight.relaxed');
	}

	.post :global(> pre) {
		overflow-x: auto;
		font-size: theme('fontSize.sm');
	}

	.post :global(> pre:not(:last-child)) {
		padding-bottom: theme('spacing.3');
	}

	.post :global(> pre:has(code)) {
		padding-top: theme('spacing.3');
		padding-bottom: theme('spacing.3');
		background: theme('colors.surface');
	}

	.post :global(a) {
		color: theme('colors.subtle');
		text-decoration: underline;
		text-underline-offset: 2px;
		display: inline-block;
		overflow: hidden;
		text-overflow: ellipsis;
		vertical-align: top;
	}

	.post :global(.blockquote) {
		color: theme('colors.subtle');
	}
</style>
