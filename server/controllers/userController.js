/* eslint-disable camelcase */
/* eslint-disable no-lonely-if */
/* eslint-disable no-else-return */
const db = require('../models/snippetModel');

const userController = {};

//  schema for our users table in SQL DB
// CREATE TABLE users (
//   user_id SERIAL PRIMARY KEY,
//   username VARCHAR(50) ,
//   snippet_id VARCHAR(50),
//   highest_wpm NUMERIC,
// );

//  sets the highest_wpm field on our users table
//  as well as generates the response to the frontend depending on your resulting wpm vs the highest_wpm on the DB
userController.setHighScore = (req, res, next) => {
  // console.log("we are in the set highscore")
  // console.log('hopefully wpm', req.body.wordsPerMinute)
  // console.log("This is our verifiedJWT", res.locals.verifiedjwt)
  // passed down from our sessionController.verify middleware containing the username from github Oauth
  const search = res.locals.verifiedjwt.login;
  const { snippet_id } = req.body;
  //  our queries onto our SQL DB
  const query = `SELECT * FROM users WHERE username = '${search}' AND snippet_id = '${snippet_id}'`;
  const createWpmQuery = `INSERT INTO users(username, snippet_id, highest_wpm)
                          VALUES($1, $2, $3)`;
  const value = [search, snippet_id, req.body.wordsPerMinute];
  const updateWPMQuery = `UPDATE users
                          SET highest_wpm = ${req.body.wordsPerMinute}
                          WHERE username = '${search}' AND snippet_id = '${snippet_id}'`;

  db.query(query, (err, data) => {
    // console.log('data.rows', data.rows)
    // console.log('data', data)
    if (err) return next(err);
    //  checks so see if theres currently a highest_wpm recorded for the username on the current snippet
    //  if theres no highest_wpm or the current wpm is greater than the stored highest_wpm it will assign the current wpm to it
    if (data.rows.length === 0) {
      db.query(createWpmQuery, value, (err, data) => {
        if (err) return next(err);
        else {
          res.locals.scoreBoardResponse = {
            message: `CONGRATULATIONS! NEW PERSONAL RECORD! WPM: ${req.body.wordsPerMinute}`,
            wpm: req.body.wordsPerMinute,
          };
          return next();
        }
      });
    } else {
      if (data.rows[0].highest_wpm < req.body.wordsPerMinute) {
        db.query(updateWPMQuery, (err, data) => {
          if (err) return next(err);
          else {
            res.locals.scoreBoardResponse = {
              message: `CONGRATULATIONS! NEW PERSONAL RECORD! WPM:${req.body.wordsPerMinute} `,
              wpm: req.body.wordsPerMinute,
            };
            return next();
          }
        });
      }
      //  if the highest_wpm on the DB is greater than current wpm
      //  this is the response text that will be sent to the frontend
      else {
        res.locals.scoreBoardResponse = {
          message: `TOUGH LUCK! YOU'VE DONE BETTER! PERSONAL BEST WPM: ${data.rows[0].highest_wpm} `,
          wpm: data.rows[0].highest_wpm,
        };
        return next();
      }
    }
  });
};

module.exports = userController;
