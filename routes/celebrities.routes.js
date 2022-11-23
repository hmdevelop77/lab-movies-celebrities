const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/", (req, res, next) => {
  res.render("index");
});

// Create
router.get("/celebrities/create", (req, res, next) => {
  try {
    res.render("celebrities/create-celebrities");
  } catch (error) {
    next(error);
  }
});
router.post("/celebrities/create", async (req, res, next) => {
  try {
    // console.log(req.body);

    const { name, occupation, catchPhrase } = req.body;
    const createdCelebrity = await Celebrity.create({
      name,
      occupation,
      catchPhrase,
    });
    console.log("A new celebrity was created:", createdCelebrity.name);
    res.redirect("/all-celebrities");
  } catch (error) {
    next(error);
  }
});

// // Read
router.get("/celebrities", async (req, res, next) => {
  try {
    const createdCelebrity = await Celebrity.find();
    res.render("celebrities/all-celebrity", { celebrities: createdCelebrity });
  } catch (error) {
    next(error);
  }
});

// router.get("/celebrities/:celebrityId", async (req, res, next) => {
//     try {
//       const { celebrityId } = req.params;
//       const celebrity = await Celebrity.findById(celebrityId);
//       res.render("books/book-details", celebrity);
//     } catch (error) {
//       next(error);
//     }
//   });

module.exports = router;
