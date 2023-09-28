/** @param {string} content */
function formatContent(content) {
	let formattedContent = content;

	formattedContent = formatBlockquotes(formattedContent);

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

export { formatContent };
