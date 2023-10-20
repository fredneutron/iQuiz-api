const express = require('express')
const userController = require('../controllers/user')


const user = express.Router()

user
    /**
     * @swagger
     * /api/v1/user/{id}:
     *  get:
     *      tags:
     *          - User
     *      description: return user detail
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: Particular User Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *      responses:
     *          200:
     *              description: an object of user
     *              schema:
     *                  $ref: '#/components/schemas/User'
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
     *      produces:
     *          - application/json
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
     *              schema:
     *                  $ref: '#/components/schemas/User'
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
     *      produces:
     *          - application/json
     *      requestBody:
     *          description: User sign up
     *          required: true
     *          content:
     *              application/json:
     *                  schema: 
     *                      $ref: '#/components/User'
     *              application/xml:
     *                  schema:
     *                      $ref: '#/components/schemas/User'
     *              application/x-www-form-urlencoded:
     *                  schema:
     *                      $ref: '#/components/schemas/User'
     *              text/plain:
     *                  schema:
     *                      type: string
     *
     *      responses:
     *          200:
     *              description: an object of user
     *              schema:
     *                  $ref: '#/components/schemas/User'
     *          500:
     *              description: SERVER ERROR
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
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: Particular User Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *          - name: user
     *            description: user object resources
     *            in: body
     *            required: true
     *            schema:
     *              $ref: '#/components/schemas/User'
     *      responses:
     *          200:
     *              description: an object of user
     *              schema:
     *                  $ref: '#/components/schemas/User'
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
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: Particular User Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *      responses:
     *          200:
     *              description: an array of user's projects
     *              schema:
     *                  $ref: '#/components/schemas/User'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .get('/:id/projects', userController.getProjects)


module.exports = user
