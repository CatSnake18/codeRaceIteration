const express = require('express');
const algoController = require('../controllers/algoController');

const router = express.Router();

router.get('/', algoController.getAlgos, (req, res) => {
  console.log('WE ARE TRYING TO GET');
  return res.status(200).json(res.locals.algos);
});

router.post(
  '/:name',
  algoController.getProblemData,
  algoController.calculate,
  (req, res) => {
    return res.status(200).json(res.locals.returnToUser);
  },
);

module.exports = router;
