"use strict";

let elForm = document.querySelector(".form");
let elResult = document.querySelector(".movies__result");
let elList = document.querySelector(".movies__list");
let elSelect = document.querySelector(".select");
let elInput = document.querySelector(".form-control");

elResult.textContent = films.length;

const generateGenres = function (films) {
  const filteredGenres = [];

  films.forEach((film) => {
    film.genres.forEach((genre) => {
      if (!filteredGenres.includes(genre)) {
        filteredGenres.push(genre);
      }
    });
  });

  filteredGenres.forEach((genre) => {
    let newOption = document.createElement("option");
    newOption.value = genre;
    newOption.textContent = genre;
    elSelect.appendChild(newOption);
  });
};

const renderFilms = function (filmsArray, element) {
  filmsArray.forEach((movie) => {
    //CREATE
    let newItem = document.createElement("li");
    let newCard = document.createElement("div");
    let nevImgBox = document.createElement("div");
    let newImg = document.createElement("img");
    let newCardBody = document.createElement("div");
    let newCardTitle = document.createElement("h5");
    let newCardGenres = document.createElement("ul");

    movie.genres.forEach((genre) => {
      let newGenre = document.createElement("li");
      newGenre.textContent = genre;
      newCardGenres.appendChild(newGenre);
    });

    //SET ATTRIBUTE
    newItem.setAttribute("class", "movies__item");
    newCard.setAttribute("class", "card");
    newCard.style.width = "18rem";
    nevImgBox.setAttribute("class", "img-box");
    newImg.setAttribute("class", "card-img-top");
    newImg.setAttribute("src", movie.poster);
    newCardBody.setAttribute("class", "card-body");
    newCardTitle.setAttribute("class", "card-title");

    //TEXT CONTENT
    newCardTitle.textContent = movie.title;

    //APPEND
    element.appendChild(newItem);
    newItem.appendChild(newCard);
    newCard.appendChild(nevImgBox);
    nevImgBox.appendChild(newImg);
    newCard.appendChild(newCardBody);
    newCardBody.appendChild(newCardTitle);
    newCardBody.appendChild(newCardGenres);
  });
};
renderFilms(films, elList);
generateGenres(films);

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let selectValue = elSelect.value;
  elList.innerHTML = null;
  let selectFilmsArray = films.filter(
    (film) => selectValue === "all" || film.genres.includes(selectValue)
  );
  renderFilms(selectFilmsArray, elList);
  elResult.textContent = selectFilmsArray.length;
});

elInput.addEventListener("keyup", () => {
  elList.innerHTML = null;
  let inputValue = elInput.value;
  let selectFilmsArray = [];

  for (let movie of films) {
    if (
      inputValue.toLowerCase() ===
      movie.title.slice(0, inputValue.length).toLowerCase()
    ) {
      elList.innerHTML = null;
      selectFilmsArray.push(movie);
    }
  }
  elResult.textContent = selectFilmsArray.length;
  renderFilms(selectFilmsArray, elList);
  generateGenres(selectFilmsArray);
});
