const actualPage = "species";

const accessKey = "6U4x1SUS2imCanBctBhbbZejtuMPZIuev0I1Xumk4IU";

let formEl;
let inputEl;
let searchResults;
let showMore;

let inputData = "";
let page = 1;

let definitionElement;

document.addEventListener("DOMContentLoaded", (event) => {
  formEl = document.querySelector("form");
  inputEl = document.getElementById("searchInput");
  searchResults = document.querySelector(".searchResults");
  showMore = document.getElementById("showMore");
 
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

async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("searchResult");

    const image = document.createElement("img");
    image.src = result.urls.small;


    imageWrapper.appendChild(image);
    searchResults.appendChild(imageWrapper);
  });

  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }

  getDefinition(inputData);
}

async function getDefinition(word) {
  const definitionUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  try {
    const response = await fetch(definitionUrl);
    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      const definition = data[0].meanings[0].definitions[0].definition;

      definitionElement.textContent = definition;
    } else {
      definitionElement.textContent = `We can't say much about "${word}".`;
    }
  } catch (error) {
    console.error(`We can't say much about "${word}".`, error);
    definitionElement.textContent = `We can't say much about "${word}".`;
  }
}