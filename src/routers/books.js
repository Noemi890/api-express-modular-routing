const express = require("express")
const booksRouter = express.Router()
const {books} = require('../../data')

booksRouter.get("/", (req, res) => {
  res.json({
    books
  })
})

booksRouter.post("/", (req, res) => {
  const newBook = req.body
  const id = books.length +1

  if (!newBook.title || !newBook.type || !newBook.author) {
    return res.status(400).json({
      error: "Missing fields in the request body"
    })
  }

  const foundBook = books.find(book => book.title === newBook.title)

  if (foundBook) {
    return res.status(409).json({
      error: "A book with the provided title already exist"
    })
  }

  books.push({
    id,
    ...newBook
  })

  res.json({
    id, 
    ...newBook
  })

})

booksRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id)

  const book = books.find(book => book.id === id)

  if (!book) {
    res.status(404).json({
      error: "A book with the provided ID does not exist"
    })
  }

  res.json({
    book
  })
})

booksRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id)

  const book = books.find(book => book.id === id)

  if(!book) {
    return res.status(404).json({
      error: "A book with the provided ID does not exist"
    })
  }

  const index = books.indexOf(book)
  books.splice(index, 1)

  res.json({
    book
  })
})

booksRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id)
  const updatedBook = req.body

  const book = books.find(book => book.id == id)

  if (!book) {
    return res.status(404).json({
      error: "A book with the provided ID does not exist"
    })
  }

  const title = books.find(book => book.title === updatedBook.title)

  if (title) {
    return res.status(409).json({
      error: "A book with the provided title already exist"
    })
  }

  if (!updatedBook.title || !updatedBook.type || !updatedBook.author) {
    return res.status(400).json({
      error: "Missing fields in the request body"
    })
  }
  const index = books.indexOf(book)
  const bookId = book.id

  books.splice(index, 1, {id: bookId, ...updatedBook})

  res.json({
    id: bookId,
    ...updatedBook
  })
})

module.exports = booksRouter
