const express = require("express")
const usersRouter = express.Router()
const {users} = require('../../data')

usersRouter.get('', (req, res) => {
  res.json({
    users
  })
})

usersRouter.post('', (req, res) => {

  const myUser = req.body
  const id = users.length + 1

  
  if (!myUser.email) {
    return res.status(404).json({
      error: "missing fields in request body"
    })
  }

  const email = users.find(user => user.email === myUser.email)
  console.log(myUser, email)

  if (email) {
    return res.status(409).json({
      error: "A user with that provided email already exist"
    })
  }

  users.push({id, ...myUser})

  res.json({
    user: {
      id, ...myUser
    }
  })
})

usersRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  console.log(id)

  const user = users.find(user => user.id === id)

  if (!user) {
    return res.status(404).json({
      error: 'No matching ID'
    })
  }

  res.json({
    user
  })
})

usersRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id)

  const myUser = users.find(user => user.id === id)
  const index = users.indexOf(myUser)

  if(!myUser) {
    return res.status(404).json({
      error: "A user with the provided ID does not exist"
    })
  }

  users.splice(index, 1)
  console.log(users)
  res.json({
    user: myUser
  })

})

usersRouter.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const newUser = req.body

  const findUser = users.find(user => user.id === id)

  if (!findUser) {
    return res.status(404).json({
      error: "A User with the provided ID does not exist"
    })
  }

  const email = users.find(user => user.email === newUser.email)
  if (email) {
    return res.status(409).json({
      error: "A User with the provided email already exist"
    })
  }

  const index = users.indexOf(findUser)
  const userId = findUser.id
  users.splice(index, 1, {id: userId, ...newUser})

  res.json({
    user: {
      id: userId,
      ...newUser
    }
  })
})

module.exports = usersRouter