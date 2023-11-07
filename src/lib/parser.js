/** @param {string} content */
function formatContent(content) {
	let formattedContent = content;

	formattedContent = formatBlockquotes(formattedContent);
	formattedContent = formatCodeBlocks(formattedContent);
	formattedContent = replaceOriginalLinks(formattedContent);

	return formattedContent;
}

/**
 * Style lines prefixed with ">"
 *
 * @param {string} content
 **/
function formatBlockquotes(content) {
	// TODO(test): blockquote with space [http://localhost:5173/item/37832434?rootId=37831062]
	// TODO(test): blockquote without space [http://localhost:5173/item/37833077?rootId=37831062]
	return content.replaceAll(
		/<p>(<i>)?(&gt;.*?)(<p>)?/gm,
		"<p class='blockquote'>$1$2",
	);
}

/**
 * Style code blocks
 *
 * @param {string} content
 **/
function formatCodeBlocks(content) {
	// TODO(test): pre with text after [http://localhost:5173/item/37831819?rootId=37830079]
	// TODO(test): pre without text after [http://localhost:5173/item/37830970?rootId=37830079]
	return content.replaceAll(
		/<pre><code>((.|\n)*?)<\/code><\/pre>/gm,
		'<pre><code>$1</code></pre><p>',
	);
}

/**
 * Replace links to news.ycombinator.com with local links
 *
 * @param {string} content
 **/
function replaceOriginalLinks(content) {
	// TODO(test): link is replaced [http://localhost:5173/item/37690996]
	return content.replaceAll(
		/<a href=".*news\.ycombinator\.com.*item\?id=(.*)">(.*)<\/a>/gm,
		"<a href='/item/$1'>$2</a>",
	);
}

export { formatContent };
