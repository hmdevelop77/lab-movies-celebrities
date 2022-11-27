const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

// find all movies
router.get("/allmovies", async (req, res, next) => {
  try {
    const allMovies = await Movie.find();
    res.render("movies/movies", { allMovies });
  } catch (error) {
    next(error);
  }
});

// create a new movie
router.get("/new-movie", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("movies/new-movie", { celebrities });
  } catch (error) {
    next(error);
  }
});
router.post("/new-movie", async (req, res, next) => {
  try {
    const { title, genre, plot, cast } = req.body;
    const createdMovie = await Movie.create({
      title,
      genre,
      plot,
      cast,
    });

    //console.log("A new Movie was created:", createdMovie.title);
    res.redirect("/allmovies");
  } catch (error) {
    next(error);
  }
});

router.get("/allmovies/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate("cast");
    //console.log(movie)
    res.render("movies/movie-details", { movie: movie });
  } catch (error) {
    next(error);
  }
});

router.post("/allmovies/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.redirect("/allmovies");
  } catch (error) {
    next(error);
  }
});

router.get("/allmovies/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);;
console.log("this movie is :",movie)
    res.render("movies/edit-movie",{ movie});
  } catch (error) {
    next(error);
  }
});

router.post("/allmovies/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(id, {
      title,
      genre,
      plot,
      cast,
    });
    res.redirect(`/allmovies/${updatedMovie._id}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
