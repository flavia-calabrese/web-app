import { db } from "./db.mjs";
import { User } from "./user.mjs";

export function Users() {
  /**
   *
   * @param {numeric} id
   * @returns {Promise<{ error: string} | {ok: User}>}
   */
  this.getById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users WHERE id=?";
      db.get(sql, [id], (err, row) => {
        if (err) return reject(err);
        if (row !== undefined) return resolve({ ok: new User(row) });
        return resolve({ error: "user not found" });
      });
    });
  };
}
