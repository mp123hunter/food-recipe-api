const db = require('../config/pg');

module.exports = {
  register: (data) =>
    new Promise((resolve, reject) => {
      const { id, name, email, password, phone, level, is_active, token, photo } = data;
      db.query(
        `INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [id, [name, email, password, phone], level, is_active, token, photo],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(data);
        }
      );
    }),
  getUserById: (id) =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id = $1`, [id], (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
  getUserByToken: (token) =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE token = $1`, [token], (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
  verifyEmail: (token) =>
    new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET is_active = 1, token = null WHERE token = $1`,
        [token],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(token);
        }
      );
    }),
  getUserByEmail: (email) =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email = $1`, [email], (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
};
