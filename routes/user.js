const express = require('express')
const userController = require('../controllers/user')


const user = express.Router()

user
    .get('/:id', userController.getUser)
    .post('/auth/signin', userController.signIn)
    .post('/auth/signup', userController.signUp)
    .put('/:id', userController.update)
    .get('/:id/projects', userController.getProjects)


module.exports = user
