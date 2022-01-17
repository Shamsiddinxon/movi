let elForm = document.querySelector(".form")
let elResult = document.querySelector(".movies__result")
let elList = document.querySelector(".movies__list")
let elSelect = document.querySelector(".select")


elResult.textContent = films.length


const generateGenres = function(films) {
  const filteredGenres = []

  films.forEach(film => {
    film.genres.forEach(genre => {
      if(!filteredGenres.includes(genre)){
        filteredGenres.push(genre)
      }
    })
  })

  filteredGenres.forEach(genre => {
    let newOption = document.createElement("option")

    newOption.value = genre
    // newOption.textContent = All
    newOption.textContent = genre
    elSelect.appendChild(newOption)
  })
}

const renderFilms = function(filmsArray, element) {
  filmsArray.forEach(movie => {
    //CREATE
    let newItem = document.createElement('li')
    let newCard = document.createElement('div')
    let nevImgBox = document.createElement("div")
    let newImg = document.createElement('img')
    let newCardBody = document.createElement('div')
    let newCardTitle = document.createElement('h5')
    let newCardGenres = document.createElement('ul')

    movie.genres.forEach(genre => {
      let newGenre = document.createElement('li')

      newGenre.textContent = genre

      newCardGenres.appendChild(newGenre)
    })

    //SET ATTRIBUTE
    newItem.setAttribute('class', 'movies__item')
    newCard.setAttribute('class', 'card')
    newCard.style.width = '18rem'
    nevImgBox.setAttribute("class", "img-box")
    newImg.setAttribute('class', 'card-img-top')
    newImg.setAttribute('src', movie.poster)
    newCardBody.setAttribute('class', 'card-body')
    newCardTitle.setAttribute('class', 'card-title')

    //TEXT CONTENT
    newCardTitle.textContent = movie.title

    //APPEND
    element.appendChild(newItem)
    newItem.appendChild(newCard)
    newCard.appendChild(nevImgBox)
    nevImgBox.appendChild(newImg)
    newCard.appendChild(newCardBody)
    newCardBody.appendChild(newCardTitle)
    newCardBody.appendChild(newCardGenres)
  })
}
renderFilms(films, elList)
generateGenres(films)


elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let selectValue = elSelect.value;
  let selectFilmsArray = [];

  elList.innerHTML = null;


  films.forEach((film) => {
    if (selectValue === "all" || film.genres.includes(selectValue)) {
      selectFilmsArray.push(film);
    }
  });

  renderFilms(selectFilmsArray, elList);
  elResult.textContent = `${selectFilmsArray.length}`

});
