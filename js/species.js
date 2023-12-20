const actualPage = "species";

//api key
const accessKey = "6U4x1SUS2imCanBctBhbbZejtuMPZIuev0I1Xumk4IU";

let formEl;
let inputEl;
let searchResults;
let showMore;

let inputData = "";
let page = 1;

let definitionElement;

// wait for the DOM content to be loaded
document.addEventListener("DOMContentLoaded", (event) => {
  // get necessary DOM elements
  formEl = document.querySelector("form");
  inputEl = document.getElementById("searchInput");
  searchResults = document.querySelector(".searchResults");
  showMore = document.getElementById("showMore");
 
// on submit show more button click events
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});


showMore.addEventListener("click", () => {
  searchImages();
});
definitionElement = document.querySelector(".definition");

});

// asynchronously search for images based on input value
async function searchImages() {
  inputData = inputEl.value;

  // construct the URL for the Unsplash API
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  // fetch images based on URL
  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  // clear previous search results if it's the first page
  if (page === 1) {
    searchResults.innerHTML = "";
  }

  // display the fetched images
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("searchResult");

    const image = document.createElement("img");
    image.src = result.urls.small;


    imageWrapper.appendChild(image);
    searchResults.appendChild(imageWrapper);
  });

  // increment page count, display "Show More" button
  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }

  // get the definition for the searched word
  getDefinition(inputData);
}

// asynchronously fetch the definition
async function getDefinition(word) {
  const definitionUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  try {
    // fetch the definition data
    const response = await fetch(definitionUrl);
    const data = await response.json();

    // display the definition if available; otherwise, show a message
    if (Array.isArray(data) && data.length > 0) {
      const definition = data[0].meanings[0].definitions[0].definition;

      definitionElement.textContent = definition;
    } else {
      definitionElement.textContent = `We can't say much about "${word}".`;
    }
  } catch (error) {
    // handle errors in fetching the definition
    console.error(`We can't say much about "${word}".`, error);
    definitionElement.textContent = `We can't say much about "${word}".`;
  }
}