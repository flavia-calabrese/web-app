"use strict";

let currentActiveFilter;
let idCurrentActiveFilter = "all";
const idFilters = ["all", "favorite", "bestRated", "seenLastMonth", "unseen"];
const titles = {
  all: "All",
  favorite: "Favorite",
  bestRated: "Best rated",
  seenLastMonth: "Seen last month",
  unseen: "Unseen",
};
let library = new FilmLibrary();
library.init();

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
      new Film(1, "Pulp Fiction", true, "2024-04-10", 5),
      new Film(2, "21 Grams", true, "2024-03-17", 4),
      new Film(3, "Star Wars", false),
      new Film(4, "Matrix", false),
      new Film(5, "Shrek", false, "2024-03-21", 3),
    ];
  };

  this.getFilms = () => {
    return [...this.list];
  };

  this.getFavorite = () => {
    let favorites = [];
    this.list.forEach((film) => {
      if (film.favorite === true) {
        favorites.push(film);
      }
    });
    return favorites;
  };

  this.getBestRated = () => {
    let bestRated = [];
    this.list.forEach((film) => {
      if (film.rating === 5) {
        bestRated.push(film);
      }
    });
    return bestRated;
  };

  this.getSeenLastMonth = () => {
    let seenLastMonth = [];
    this.list.forEach((film) => {
      if (film.watchDate != null) {
        let now = dayjs();
        let duration = now.diff(film.watchDate, "day");
        // console.log(duration);
        if (duration < 30) {
          seenLastMonth.push(film);
        }
      }
    });
    return seenLastMonth;
  };

  this.getUnseen = () => {
    let unseen = [];
    this.list.forEach((film) => {
      if (film.watchDate == null) {
        unseen.push(film);
      }
    });
    return unseen;
  };
}

function filterFilms(id, library) {
  let filterdFilms = [];
  switch (id) {
    case "all":
      filterdFilms = library.getFilms();
      break;
    case "favorite":
      filterdFilms = library.getFavorite();
      break;
    case "bestRated":
      filterdFilms = library.getBestRated();
      break;
    case "seenLastMonth":
      filterdFilms = library.getSeenLastMonth();
      break;
    case "unseen":
      filterdFilms = library.getUnseen();
      break;
    default:
      break;
  }
  return filterdFilms;
}

function fillFilmsList(films) {
  const filmList = document.getElementById("films-list");
  filmList.innerHTML = "";
  // console.log(filmList);
  let filteredFilms = filterFilms(idCurrentActiveFilter, library);
  for (let film of filteredFilms) {
    const liFilm = createFilmItem(film);
    // console.log(liFilm);
    filmList.appendChild(liFilm);
  }
}

function addRemoveFilmListener(trashIcon, film) {
  trashIcon.addEventListener("click", (event) => {
    // console.log(film);
    library.list = library.list.filter((f) => f !== film);
    // console.log(library.list);
    fillFilmsList(library.getFilms());
  });
}

function addRateListener(star) {}

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

  inpt.addEventListener("click", (event) => {
    if (film.favorite === false) {
      film.favorite = true;
    } else {
      film.favorite = false;
    }
  });
  // checked
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

  let maxRate = 5;
  let stars = [];

  for (let i = 0; i < maxRate; i++) {
    const iElement = document.createElement("i");
    iElement.addEventListener("click", (event) => {
      library.list = library.list.map((f) => {
        if (f.id === film.id) {
          f.rating = i + 1;
        }
        return f;
      });
      fillFilmsList(library.list);
    });

    let fill = film.rating;
    let notFill = maxRate - fill;

    if (i < fill) {
      iElement.className = "bi bi-star-fill";
    } else {
      iElement.className = "bi bi-star";
    }

    ratingCol.appendChild(iElement);
    stars.push(iElement);
  }

  // for (let i = 0; i < fill; i++) {
  //   const iElement = document.createElement("i");
  //   iElement.className = "bi bi-star-fill";
  //   addRateListener(iElement);
  //   ratingCol.appendChild(iElement);
  // }

  // for (let i = 0; i < notFill; i++) {
  //   const iElement = document.createElement("i");
  //   iElement.className = "bi bi-star";
  //   ratingCol.appendChild(iElement);
  // }

  const iconCol = document.createElement("div");
  iconCol.className = "d-none d-xl-flex actions";
  const penIcon = document.createElement("i");
  penIcon.className = "bi bi-pencil";
  const trashIcon = document.createElement("i");
  trashIcon.className = "bi bi-trash";
  iconCol.appendChild(penIcon);
  iconCol.appendChild(trashIcon);

  addRemoveFilmListener(trashIcon, film);

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

function createManuBar(menu) {
  const allFilter = document.createElement("li");
  allFilter.className = "nav-item";
  const allLink = document.createElement("a");
  allLink.className = "nav-link active";
  allLink.innerText = "All";
  allFilter.appendChild(allLink);
  allLink.id = "all";

  const favoriteFilter = document.createElement("li");
  favoriteFilter.className = "nav-item";
  const favoriteLink = document.createElement("a");
  favoriteLink.className = "nav-link link-dark";
  favoriteLink.innerText = "Favorite";
  favoriteFilter.appendChild(favoriteLink);
  favoriteLink.id = "favorite";

  const bestRatedFilter = document.createElement("li");
  bestRatedFilter.className = "nav-item";
  const bestRatedLink = document.createElement("a");
  bestRatedLink.className = "nav-link link-dark";
  bestRatedLink.innerText = "Best Rated";
  bestRatedFilter.appendChild(bestRatedLink);
  bestRatedLink.id = "bestRated";

  const seenLastMonthFilter = document.createElement("li");
  seenLastMonthFilter.className = "nav-item";
  const seenLastMonthLink = document.createElement("a");
  seenLastMonthLink.className = "nav-link link-dark";
  seenLastMonthLink.innerText = "Seen Last Month";
  seenLastMonthFilter.appendChild(seenLastMonthLink);
  seenLastMonthLink.id = "seenLastMonth";

  const unseenFilter = document.createElement("li");
  unseenFilter.className = "nav-item";
  const unseenLink = document.createElement("a");
  unseenLink.className = "nav-link link-dark";
  unseenLink.innerText = "Unseen";
  unseenFilter.appendChild(unseenLink);
  unseenLink.id = "unseen";

  menu.appendChild(allFilter);
  menu.appendChild(favoriteFilter);
  menu.appendChild(bestRatedFilter);
  menu.appendChild(seenLastMonthFilter);
  menu.appendChild(unseenFilter);

  //return menu;
}

function modifyFilmTitle(id) {
  const title = document.getElementById("filter-title");
  title.innerText = titles[id];
}

function addFilterListener(id) {
  const filter = document.getElementById(`${id}`);
  filter.addEventListener("click", (event) => {
    currentActiveFilter.className = "nav-link link-dark";
    filter.className = "nav-link active";
    currentActiveFilter = filter;
    // const filteredFilms = filterFilms(id, library);
    // console.log(filteredFilms);
    // fillFilmsList(filteredFilms);
    idCurrentActiveFilter = id;
    fillFilmsList(library.list);
    modifyFilmTitle(id);
  });
}

function main() {
  library.init();
  const films = library.getFilms();

  const menu = document.getElementById("films-filters").children[0].children[1];

  fillFilmsList(films);
  createManuBar(menu);

  currentActiveFilter = document.getElementById("all");

  idFilters.forEach((id) => {
    addFilterListener(id);
  });
}

main();
