<script>
	export let content = '';

	/** @param {string} content */
	function formatContent(content) {
		return (
			content
				// Style blockquotes
				.replaceAll(/<p>(<i>)?(&gt;.*?)(<p>)?/gm, "<p class='blockquote'>$1$2")
		);
	}
</script>

<div class="post">
	{@html formatContent(content)}
</div>

<style>
	.post {
		/* 
		 * TODO: Why is this necessary to prevent pre tags from overflowing? 
		 * http://localhost:5173/item/36684315
		 */
		display: grid;

		overflow-wrap: break-word;
		/*
		 * Prevent long words from overflowing the container.
		 * http://localhost:5173/item/36714868
		 */
		word-break: break-word;
	}

	.post :global(> *) {
		margin-top: theme('spacing.3');
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
