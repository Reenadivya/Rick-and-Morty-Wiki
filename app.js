const baseUrl = "https://rickandmortyapi.com/api/character";
const SEARCH_API = "https://rickandmortyapi.com/api/character/?name=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getRickandMorty(baseUrl);

async function getRickandMorty(url) {
  const response = await fetch(url);
  const data = await response.json();
  showCharacters(data.results);
}

function showCharacters(characters) {
  main.innerHTML = "";

  characters.forEach((character) => {
    const { name, status, image, type, gender, origin, location } = character;

    const characterEl = document.createElement("div");

    characterEl.classList.add("character");

    characterEl.innerHTML = `
    
        <img src="${image}" alt="" />
        <div class="movie-info">
          <h3>${name}</h3>
          <span class="${getClassByStatus(status)}">${status}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          <h2>Type: ${type ? type : "Human"}</h2>
          <h2>Gender: ${gender}</h2>
          <h2>Origin: ${origin.name}</h2>
          <h2>Location: ${location.name}</h2>
        </div>
      

    `;

    main.appendChild(characterEl);
  });
}

function getClassByStatus(state) {
  if (state === "Dead") {
    return "red";
  } else if (state === "Alive") {
    return "green";
  } else {
    return "yellow";
  }
}

form.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    e.preventDefault();
    const searchTerm = search.value;
    console.log(searchTerm);
    if (searchTerm && searchTerm !== "") {
      getRickandMorty(SEARCH_API + searchTerm);

      search.value = "";
    }
  }
});
