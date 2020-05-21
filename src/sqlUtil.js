const  Promise = require('promise');
const { Pool } = require('pg');
require('dotenv').config();

// this initializes a connection pool
// it will keep idle connections open for 30 seconds
// and set a limit of maximum 10 idle clients
const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

// export the query method for passing queries to the pool
const query = (text, values, callback) => pool.query(text, values, callback);

const getTesting = () =>
  new Promise((resolve, reject) => {
    query('SELECT * FROM data.testing', null, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.rows);
      }
    });
  });

const getUserInfo = (username, password) =>
  new Promise((resolve, reject) => {
    query(`SELECT first_name, last_name, role FROM data.users WHERE username = '${username}' AND password = '${password}';`, null, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.rows);
      }
    });
  });

  // Fetching a caption for user depending on whether that caption was evaluated or not
  const fetchCaption = (username) =>
    new Promise((resolve, reject) => {
      query(`WITH tmp AS (SELECT captions_data.id as caption_id, image_data.id as image_id, image_data.coco_url as link, captions_data.caption
            FROM data.image_data inner join data.captions_data ON image_data.id = captions_data.image_id)
            SELECT * FROM tmp 
            WHERE tmp.caption_id NOT IN (SELECT responses.caption_id FROM data.responses WHERE responses.username = '${username}')
            OFFSET floor(random() * (SELECT COUNT(*) FROM tmp)) LIMIT 1;`, null, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows);
        }
      });
    });

  const addNewRequest = (first_name, last_name, email, username) =>
  new Promise((resolve, reject) => {
    query(`INSERT INTO data.requests VALUES ('${first_name}', '${last_name}', '${email}', '${username}');`, null, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

  const recordResponse = (username, caption_id, image_id, caption_score) =>
  new Promise((resolve, reject) => {
    query(`INSERT INTO data.responses VALUES ('${username}', DEFAULT, ${caption_id}, ${image_id}, ${caption_score});`, null, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

exports.getTesting = getTesting;
exports.getUserInfo = getUserInfo;
exports.fetchCaption = fetchCaption;
exports.addNewRequest = addNewRequest;
exports.recordResponse = recordResponse;
