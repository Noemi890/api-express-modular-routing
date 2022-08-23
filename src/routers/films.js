const express = require("express")
const filmsRouter = express.Router()
const {films} = require('../../data')

filmsRouter.get("/", (req, res) => {
  res.json({
    films
  })
})

filmsRouter.post("/", (req, res) => {
  const newFilm = req.body
  const id = films.length + 1

  if (!newFilm.title || !newFilm.director) {
    return res.status(400).json({
      error: "Missing fields in request body"
    })
  }

  const foundMovie = films.find(film => film.title === newFilm.title)

  if (foundMovie) {
    return res.status(409).json({
      error: "A film with the provided title already exist"
    })
  }

  films.push({id, ...newFilm})

  res.json({
    film: {
      id, 
      ...newFilm
    }
  })
})

filmsRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id)

  const film = films.find(film => film.id === id)

  if (!film) {
    res.status(404).json({
      error: "A film with the provided ID does not exist"
    })
  }

  res.json({
    film
  })
})

filmsRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id)

  const film = films.find(film => film.id === id)

  if (!film) {
    return res.status(404).json({
      error: "A film with the provided ID does not exist"
    })
  }

  const index = films.indexOf(film)

  films.splice(index, 1)

  res.json({
    film
  })
})

filmsRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id)
  const updatedfilm = req.body

  const film = films.find(film => film.id === id)

  if (!film) {
    return res.status(404).json({
      error: "A film with the provided ID does not exist"
    })
  }

  const title = films.find(film => film.title === updatedfilm.title)

  if (title) {
    return res.status(409).json({
      error: "A film with the provided title already exist"
    })
  }
  //Own extension!
  if (!updatedfilm.title || !updatedfilm.director) {
    return res.status(400).json({
      error: "Missing fields in the update body"
    })
  }
  //

  const index = films.indexOf(film)
  const filmId = film.id

  films.splice(index, 1, {id: filmId, ...updatedfilm})

  res.json({
    film: {
      id: filmId,
      ...updatedfilm
    }
  })
})


module.exports = filmsRouter