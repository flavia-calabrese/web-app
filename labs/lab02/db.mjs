import sqlite from "sqlite3";

export const db = new sqlite.Database("films.db", (err) => {
  if (err) throw err;
});
