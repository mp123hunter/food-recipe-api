const db = require('../config/pg');

module.exports = {
  getSavedRecipeByUser: (id, sort, sortType, limit, offset) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT saved_recipes.id, saved_recipes.user_id, users.name, saved_recipes.recipe_id, recipes.title
        FROM saved_recipes INNER JOIN users ON saved_recipes.user_id = users.id
        INNER JOIN recipes ON saved_recipes.recipe_id = recipes.id 
        WHERE saved_recipes.user_id = $1 ORDER BY ${sort} ${sortType} LIMIT $2 OFFSET $3`,
        [id, limit, offset],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  getCountSavedRecipe: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT COUNT(*) AS total FROM saved_recipes WHERE user_id = $1`,
        [id],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res.rows[0].total);
        }
      );
    }),
  getSavedRecipeById: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM saved_recipes WHERE id = $1`,
        [id],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  createSavedRecipe: (data) =>
    new Promise((resolve, reject) => {
      const { id, user_id, recipe_id } = data;
      db.query(
        `INSERT INTO saved_recipes VALUES ($1, $2, $3)`,
        [id, user_id, recipe_id],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(data);
        }
      );
    }),
  deleteSavedRecipe: (id) =>
    new Promise((resolve, reject) => {
      db.query(`DELETE FROM saved_recipes WHERE id = $1`, [id], (err) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(id);
      });
    }),
};
