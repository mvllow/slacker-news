/** @param {string} content */
function formatContent(content) {
	let formattedContent = content;

	formattedContent = formatBlockquotes(formattedContent);
	formattedContent = replaceOriginalLinks(formattedContent);

	return formattedContent;
}

/**
 * Style lines prefixed with ">"
 *
 * @param {string} content
 **/
function formatBlockquotes(content) {
	return content.replaceAll(
		/<p>(<i>)?(&gt;.*?)(<p>)?/gm,
		"<p class='blockquote'>$1$2",
	);
}

/**
 * Replace links to news.ycombinator.com with links to news.mellow.dev
 *
 * @param {string} content
 **/
function replaceOriginalLinks(content) {
	// TODO(test): http://localhost:5173/item/37690996
	return content.replaceAll(
		/<a href=".*news\.ycombinator\.com.*item\?id=(.*)">(.*)<\/a>/gm,
		"<a href='https://news.mellow.dev/item/$1'>$2</a>",
	);
}

export { formatContent };
