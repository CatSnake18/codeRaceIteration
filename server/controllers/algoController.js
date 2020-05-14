const db = require('../models/snippetModel');
const safeEval = require('safe-eval');

const algoController = {};

algoController.getAlgos = (req, res, next) => {
  const query = 'SELECT * FROM algo';
  db.query(query, (err, data) => {
    if (err) {
      return next(err);
    }
    res.locals.algos = data.rows;
    return next();
  });
};

algoController.getProblemData = (req, res, next) => {
  const { name } = req.params;
  const obj = {};
  const query1 = `SELECT (input) FROM algo WHERE name='${name}';`;
  const asyncQ1 = (query) =>
    new Promise((resolve, reject) => {
      db.query(query, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });

  const query2 = `SELECT (expected) FROM algo WHERE name='${name}';`;
  const asyncQ2 = (query) =>
    new Promise((resolve, reject) => {
      db.query(query, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  Promise.all([
    asyncQ1(query1).then((data) => {
      obj.inputs = data.rows[0].input.split(',');
    }),
    asyncQ2(query2).then((data) => {
      obj.outputs = data.rows[0].expected.split(',');
    }),
  ]).then(() => {
    res.locals.problemData = obj;
    return next();
  });
};

algoController.calculate = (req, res, next) => {
  const { userCode } = req.body;
  const { length } = userCode;
  const { inputs } = res.locals.problemData;
  const { outputs } = res.locals.problemData;
  try {
    const res1 = safeEval(userCode + `("${inputs[0]}")`);
    const res2 = safeEval(userCode + `("${inputs[1]}")`);

    const res3 = safeEval(userCode + `("${inputs[2]}")`);
    // console.log('RES:', res2, 'AND', outputs[1]);

    if (res1 == outputs[0] && res2 == outputs[1] && res3 == outputs[2]) {
      res.locals.returnToUser = `Good job! You did it with only
    ${length} symbols`;
    } else {
      res.locals.returnToUser = `Some tests didnt past... think!`;
    }
    return next();
  } catch (error) {
    res.locals.returnToUser =
      'Oops, something didnt work, check your code, dear.';

    return next();
  }
};
// function s(num) {
//   if (num % 2 === 0) return 'Even';
//   return 'Odd';
// }
module.exports = algoController;
