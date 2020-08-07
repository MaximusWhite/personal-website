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
    query(`SELECT first_name, last_name, role, salt FROM data.users WHERE username = '${username}' AND password = '${password}';`, null, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.rows);
      }
    });
  });

const getVerificationInfo = (username, first_name) => 
  new Promise((resolve, reject) => {
    query(`SELECT role, salt FROM data.users WHERE username = '${username}' AND first_name = '${first_name}';`, null, (err, res) => {
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
      query(`WITH tmp AS (SELECT image_id, coco_url AS link, res.id AS caption_id, caption 
            FROM data.image_data INNER JOIN data.captions_data AS res
            ON image_data.id = res.image_id
            ORDER BY image_id
            OFFSET 250 * (SELECT batch_number FROM 
                    data.user_batch INNER JOIN data.users ON user_batch.user_id = users.id
                    WHERE users.username = '${username}')
            LIMIT 250), 
            tmp2 AS (
            SELECT * FROM tmp 
            WHERE tmp.caption_id NOT IN (SELECT responses.caption_id FROM data.responses WHERE responses.username = '${username}')
            )
            SELECT * FROM tmp2
            OFFSET floor(random() * (SELECT COUNT(*) FROM tmp2)) LIMIT 1;`, null, (err, res) => {
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

  const recordResponse = (username, caption_id, image_id, content_score, layout_score) =>
  new Promise((resolve, reject) => {
    query(`INSERT INTO data.responses VALUES ('${username}', DEFAULT, ${caption_id}, ${image_id}, ${content_score}, ${layout_score});`, null, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

  const shiftBatch = (username) =>
  new Promise((resolve, reject) => {
    query(`UPDATE data.user_batch SET batch_number = ((select batch_number 
        FROM data.user_batch INNER JOIN data.users ON user_batch.user_id = users.id
        WHERE username = '${username}'
      ) + 1)
        WHERE user_id = (SELECT user_id 
        FROM data.user_batch INNER JOIN data.users ON user_batch.user_id = users.id
        WHERE username = '${username}');`, null, (err, res) => {
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
exports.getVerificationInfo = getVerificationInfo;
exports.shiftBatch = shiftBatch;
