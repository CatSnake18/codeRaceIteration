const express = require("express");
const algoController = require("../controllers/algoController");

const router = express.Router();
//  populates nav bar with our categories from our database
router.get("/", algoController.getNames, (req, res) => {
  return res.status(200).json(res.locals.categories);
});

//  when clicking a category, gets a random snippet from that category and puts it into the codesnippet
router.get("/:search", algoController.getProblem, (req, res) =>
  res.status(200).json(res.locals.snippet)
);
module.exports = router;
