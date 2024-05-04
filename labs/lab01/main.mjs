import { Film } from "./film.mjs";
import { FilmLibrary } from "./filmLibrary.mjs";

function main() {
  // Creating some film entries
  const pulpFiction = new Film(1, 1, "Pulp Fiction", true, "2024-03-10", 5);
  const grams21 = new Film(2, 1, "21 Grams", true, "2024-03-17", 4);
  const starWars = new Film(3, 1, "Star Wars", false);
  const matrix = new Film(4, 1, "Matrix");
  const shrek = new Film(5, 1, "Shrek", false, "2024-03-21", 3);

  // Adding the films to the FilmLibrary
  const library = new FilmLibrary();
  library.addNewFilm(pulpFiction);
  library.addNewFilm(grams21);
  library.addNewFilm(starWars);
  library.addNewFilm(matrix);
  library.addNewFilm(shrek);

  // Print Films
  console.log("***** List of films *****");
  library.films.forEach((element) => {
    console.log(element.toString());
  });

  // Print Films by Date
  const tmp = [...library.sortByData()];
  console.log("");
  tmp.forEach((element) => {
    console.log(element.toString());
  });

  //Print Films without data - film 1
  library.deleteFilm(1);
  library.resetWatchedFilms();
  console.log();
  library.films.forEach((element) => {
    console.log(element.toString());
  });

  // Print Films by ordered score and without not scored films
  console.log();
  library.getRated().forEach((element) => console.log(element.toString()));
}

main();
