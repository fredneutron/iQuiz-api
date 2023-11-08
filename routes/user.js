const express = require('express')
const userController = require('../controllers/user')
const UserController = require('../controllers/user')


const user = express.Router()
/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  description: The auto-generated id of the user
 *              first_name:
 *                  type: string
 *                  description: The first name of the user
 *                  maxLength: 35
 *              last_name:
 *                  type: string
 *                  description: The last name of the user
 *                  maxLength: 35
 *              email:
 *                  type: string
 *                  description: email of the user
 *                  format: email
 *              password:
 *                  type: string
 *                  description: encrypted password of the user
 *                  format: password
 *              dob:
 *                  type: string
 *                  description: date of birth of the user
 *                  format: date
 *              gender:
 *                  type: string
 *                  description: gender selection of the user from the provided options
 *                  enum:
 *                      - male
 *                      - female
 *                      - other
 */
user
    /**
     * @swagger
     * /api/v1/user/all:
     *  get:
     *      tags:
     *          - User
     *      description: return users
     *      responses:
     *          200:
     *              description: an array of users' objects
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/User'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .get('/all', UserController.all)
    /**
     * @swagger
     * /api/v1/user/{id}:
     *  get:
     *      tags:
     *          - User
     *      description: return user detail
     *      parameters:
     *          - name: id
     *            description: Particular User Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *      responses:
     *          200:
     *              description: an object of user
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/User'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .get('/:id', userController.getUser)
        /**
     * @swagger
     * /api/v1/user/auth/signin:
     *  post:
     *      tags:
     *          - User
     *      description: sign in valid user
     *      requestBody:
     *          description: User login authenication
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          email:
     *                              type: string
     *                          password:
     *                              type: string
     *                      required:
     *                          - email
     *                          - password
     *              application/x-www-form-urlencoded:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          email:
     *                              type: string
     *                          password:
     *                              type: string
     *                      required:
     *                          - email
     *                          - password
     *      responses:
     *          200:
     *              description: an object of user
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/User'
     *          401:
     *              description: Authentication Failed.
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .post('/auth/signin', userController.signIn)
        /**
     * @swagger
     * /api/v1/user/auth/signup:
     *  post:
     *      tags:
     *          - User
     *      description: sign up for new users
     *      requestBody:
     *          description: User sign up
     *          required: true
     *          content:
     *              application/json:
     *                  schema: 
     *                      $ref: "#/components/schemas/User"
     *                  example:
     *                      first_name: test
     *                      last_name: user1
     *                      email: user1@example.cpm
     *                      password: user1spass
     *                      dob: 2023-11-03
     *                      gender: male
     *              application/xml:
     *                  schema:
     *                      $ref: '#/components/schemas/User'
     *                  example:
     *                      first_name: test
     *                      last_name: user1
     *                      email: user1@example.cpm
     *                      password: user1spass
     *                      dob: 2023-11-03
     *                      gender: male
     *              application/x-www-form-urlencoded:
     *                  schema:
     *                      $ref: '#/components/schemas/User'
     *                  example:
     *                      first_name: test
     *                      last_name: user1
     *                      email: user1@example.cpm
     *                      password: user1spass
     *                      dob: 2023-11-03
     *                      gender: male
     *
     *      responses:
     *          200:
     *              description: OK
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/User'
     *          400:
     *              description:  Bad request.
     *          403:
     *              description: forbidden request.
     *          500:
     *              description: SERVER ERROR.
     * 
     */
    .post('/auth/signup', userController.signUp)
        /**
     * @swagger
     * /api/v1/user/{id}:
     *  put:
     *      tags:
     *          - User
     *      description: update user detail
     *      parameters:
     *          - name: id
     *            description: Particular User Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *      
     *      requestBody:
     *          description: User sign up
     *          required: true
     *          content:
     *              application/json:
     *                  schema: 
     *                      $ref: "#/components/schemas/User"
     *                  example:
     *                      first_name: test
     *                      last_name: user1
     *                      email: user1@example.cpm
     *                      password: user1spass
     *                      dob: 2023-11-03
     *                      gender: male
     *              application/xml:
     *                  schema:
     *                      $ref: '#/components/schemas/User'
     *                  example:
     *                      first_name: test
     *                      last_name: user1
     *                      email: user1@example.cpm
     *                      password: user1spass
     *                      dob: 2023-11-03
     *                      gender: male
     *              application/x-www-form-urlencoded:
     *                  schema:
     *                      $ref: '#/components/schemas/User'
     *                  example:
     *                      first_name: test
     *                      last_name: user1
     *                      email: user1@example.cpm
     *                      password: user1spass
     *                      dob: 2023-11-03
     *                      gender: male
     *      responses:
     *          200:
     *              description: an object of user
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/User'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .put('/:id', userController.update)
        /**
     * @swagger
     * /api/v1/user/{id}/projects:
     *  get:
     *      tags:
     *          - User
     *      description: return user's projects
     *      parameters:
     *          - name: id
     *            description: Particular User Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *      responses:
     *          200:
     *              description: an array of user's projects
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/User'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .get('/:id/projects', userController.getProjects)


module.exports = user
