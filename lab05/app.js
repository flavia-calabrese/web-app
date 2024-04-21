"use strict";

function Film(
  id,
  title,
  isFavorite = false,
  watchDate = null,
  rating = 0,
  userId = 1
) {
  this.id = id;
  this.title = title;
  this.favorite = isFavorite;
  this.rating = rating;
  // saved as dayjs object only if watchDate is truthy
  this.watchDate = watchDate && dayjs(watchDate);
  this.userId = userId;
}

function FilmLibrary() {
  this.list = [];

  this.init = () => {
    this.list = [
      new Film(1, "Pulp Fiction", true, "2024-03-10", 5),
      new Film(2, "21 Grams", true, "2024-03-17", 4),
      new Film(3, "Star Wars", false),
      new Film(4, "Matrix", false),
      new Film(5, "Shrek", false, "2024-03-21", 3),
    ];
  };

  this.getFilms = () => {
    return [...this.list];
  };
}

function fillFilmsList(films) {
  const filmList = document.getElementById("films-list");
  // console.log(filmList);

  for (let film of films) {
    const liFilm = createFilmItem(film);
    // console.log(liFilm);
    filmList.appendChild(liFilm);
  }
}

function createFilmItem(film) {
  const li = document.createElement("li");
  li.className = "list-group-item";

  //li.setAttribute("id", `films-${film.id}`);

  const row = document.createElement("div");
  row.className = "row gy-2";

  const titleCol = document.createElement("div");
  titleCol.className =
    "col-6 col-xl-3 favorite-title d-flex gap-2 align-items-center";
  titleCol.innerText = film.title;

  const div = document.createElement("div");
  div.className = "d-xl-none actions";
  const i1 = document.createElement("i");
  const i2 = document.createElement("i");
  i1.className = "bi bi-pencil";
  i2.className = "bi bi-trash";

  div.appendChild(i1);
  div.appendChild(i2);
  titleCol.appendChild(div);

  const checkboxCol = document.createElement("div");
  checkboxCol.className = "col-6 col-xl-3 text-end text-xl-center";

  const spn = document.createElement("span");
  spn.className = "custom-control custom-checkbox";
  const inpt = document.createElement("input");
  inpt.className = "custom-control-input";
  inpt.type = "checkbox";

  // checked ??
  if (film.favorite === true) {
    inpt.checked = true;
  }

  const lbl = document.createElement("label");
  lbl.className = "custom-control-label";
  lbl.innerText = "Favorite";

  spn.appendChild(inpt);
  spn.appendChild(lbl);
  checkboxCol.appendChild(spn);

  const dateCol = document.createElement("div");
  dateCol.className = "col-4 col-xl-3 text-xl-center";
  if (film.watchDate == null) {
    dateCol.innerText = "";
  } else {
    dateCol.innerText = film.watchDate.format("MMMM D, YYYY");
  }

  const ratingCol = document.createElement("div");
  ratingCol.className = "rating";

  let fill = film.rating;
  let notFill = 5 - fill;

  for (let i = 0; i < fill; i++) {
    const iElement = document.createElement("i");
    iElement.className = "bi bi-star-fill";
    ratingCol.appendChild(iElement);
  }

  for (let i = 0; i < notFill; i++) {
    const iElement = document.createElement("i");
    iElement.className = "bi bi-star";
    ratingCol.appendChild(iElement);
  }

  const iconCol = document.createElement("div");
  iconCol.className = "d-none d-xl-flex actions";
  iconCol.innerHTML = `
  <i class="bi bi-pencil"></i>
  <i class="bi bi-trash"></i>

  `;

  const actContainer = document.createElement("div");
  actContainer.className = "actions-container col-8 col-xl-3 text-end";

  actContainer.appendChild(ratingCol);
  actContainer.appendChild(iconCol);

  row.appendChild(titleCol);
  row.appendChild(checkboxCol);
  row.appendChild(dateCol);
  row.appendChild(actContainer);

  li.appendChild(row);

  return li;
}

function main() {
  const library = new FilmLibrary();
  library.init();
  const films = library.getFilms();

  fillFilmsList(films);
}
main();
