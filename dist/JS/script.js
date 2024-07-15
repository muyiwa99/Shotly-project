// Todo
// fetch request
// Local storage
// Append link container with relvant details
// Store shortned links into an empty array
//  Copy button on Links
// Input validation
//

"use strict";

const inputLink = document.querySelector("#linkInput");
const shortenButton = document.querySelector(".link-container_button");
const copyButton = document.querySelectorAll("copy-button");

const shortlinkContainer = document.querySelector("link-container_link-box");

const body = document.getElementsByTagName("BODY")[0];

document.addEventListener("DOMContentLoaded", () => {
  initializeApp();

  shortenButton.addEventListener("click", async function () {
    // let link = inputLink.value.trim();
    // console.log("Link input value:", link);
    // //   console.log("1");
    // if (validateLink(link)) {
    //   await shortenLink(link);
    //   appendLinkContainer();
    //   console.log(link);
    // } else {
    //   displayValidationError();
    // }

    let linkInput = document.getElementById("linkInput");
    if (!linkInput) {
      console.error("Link input element not found");
      return;
    }
    let link = linkInput.value.trim();
    console.log("Link input value:", link); // Debug: Check the value of the link input

    if (validateLink(link)) {
      await shortenLink(link);
    } else {
      displayValidationError();
    }
  });
});
// Initializes the appliccation
const initializeApp = function () {
  //   loadLocalStorageLinks();
  //   displayLocalStorageLinks();
};

const validateLink = function (link) {
  if (!link) {
    console.error("Link is undefined or empty"); // Debug: Link is undefined or empty
    return false;
  }
  return link.startsWith("http://") || link.startsWith("https://");
};

const shortenLink = async function (link) {
  try {
    const response = await fetch("https://shrtlnk.dev/api/v2/link", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ orinalURL: link }),
    });

    const data = await response.json();
    if (data.shortURL) {
      let shortenedLink = data.shortURL;
      appendLinkContainer(link, shortenedLink);
      saveLinkToLocalStorage(link, shortenedLink);
    } else {
      console.error("Error Shortening link:", data);
      displayError("Error shortening the link. Please try again");
    }
  } catch {
    console.error(error);
    displayError("Error shortening the link. Please try again");
  }
};

const appendLinkContainer = function (orignialLink, shortenedLink) {
  shortlinkContainer.innerHTML = "";

  const html = `<div class="link-container_link-box">
				<p class="old-link">${orignialLink}</p>
				<hr />
				<div class="new">
					<a href="#" class="new-link">${shortenedLink}</a>

					<button class="copy-button">Copy</button>
				</div>
			</div>`;

  inputLink.insertAdjacentElement("afterend", html);
};

function displayValidationError() {
  alert("Invalid link. Please make sure it starts with http:// or https://");
}

function saveLinkToLocalStorage(originalLink, shortenedLink) {
  let links = JSON.parse(localStorage.getItem("links")) || [];
  links.push({ original: originalLink, shortened: shortenedLink });
  localStorage.setItem("links", JSON.stringify(links));
}

function loadLinksFromLocalStorage() {
  let links = JSON.parse(localStorage.getItem("links")) || [];
  links.forEach((link) => appendLinkContainer(link.original, link.shortened));
}
