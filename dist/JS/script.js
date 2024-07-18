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
      console.log(shortenLink(link));
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
    inputLink.style.border = "3px solid red";

    inputLink.classList.add("link-container_inputE");

    inputLink.placeholder = " Please provide a link here!";

    console.error("Link is undefined or empty"); // Debug: Link is undefined or empty
    return false;
  }
  return link.startsWith("http://") || link.startsWith("https://");
};

// const shortenLink = async function (link) {
//   try {
//     const response = await fetch("https://cleanuri.com/api/v1/shorten", {
//       mode: "no-cors",
//       method: "POST",
//       headers: {
//         Authorization: "Bearer YOUR_API_TOKEN",
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({ URL: link }),
//     });
//     console.log(response);

//     if (!response.ok) {
//       // If response is not ok, log the status and statusText
//       console.error(`Error: ${response.status} ${response.statusText}`);
//       displayError("Error shortening the link. Please try again");
//       return;
//     }

//     const data = await response.json();
//     if (data) {
//       let shortenedLink = data.result_url;
//       //   appendLinkContainer(link, shortenedLink);
//       //   saveLinkToLocalStorage(link, shortenedLink);
//       console.log("it worked");
//     } else {
//       console.error("Error Shortening link:", data);
//       displayError("Error shortening the link. Please try again");
//     }
//   } catch (error) {
//     console.error(error);
//     // displayValidationError("Error shortening the link. Please try again");
//   }
// };

const shortenLink = async function (link) {
  try {
    const response = await fetch("https://cleanuri.com/api/v1/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ url: link }), // Corrected property name and ensuring it's a POST request
    });

    if (!response.ok) {
      // If response is not ok, log the status and statusText
      console.error(`Error: ${response.status} ${response.statusText}`);
      displayError("Error shortening the link. Please try again");
      return;
    }

    const data = await response.json();

    if (data.result_url) {
      let shortenedLink = data.result_url;
      appendLinkContainer(link, shortenedLink);
      saveLinkToLocalStorage(link, shortenedLink);
    } else {
      console.error("Error shortening link:", data);
      displayError("Error shortening the link. Please try again");
    }

    console.log(data.result_url);
  } catch (error) {
    console.error("Fetch error:", error);
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

function displayError(message) {
  alert(message);
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
