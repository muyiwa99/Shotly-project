// Todo
// fetch request
// Local storage
// Append link container with relvant details
// Store shortned links into an empty array
//  Copy button on Links
// Input validation
//

"use strict";

const inputLink = document.querySelector(".link-container_input");
const shortenButton = document.querySelector(".link-container_button");
const copyButton = document.querySelectorAll("copy-button");

// Initializes the appliccation
const initializeApp = function () {
	loadLocalStorageLinks();
	displayLocalStorageLinks();
};

shortenButton.addEventListener("click", function () {
	let link = inputLink.value;

	if (validateLink(link)) {
		appendLinkContainer(link, shortenedLink);
		saveLinkToStorage(link, shortenedLink);
	} else {
		displayValidationError();
	}
});

const validateLink = function (link) {
	return link.startsWith("http://") || link.startsWith("https://");
};
