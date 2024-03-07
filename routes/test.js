const express = require('express')
const testController = require('../controllers/test')


const test = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      Test:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  description: The auto-generated id of the test
 *              name:
 *                  type: string
 *                  description: The name of the test
 *                  required: true
 *              description:
 *                  type: string
 *                  description: The description of the Test
 *              instruction:
 *                  type: string
 *                  description: instructions of the test
 *                  required: false 
 *              question:
 *                  type: array
 *                  description: array of objects of question
 *              projectId:
 *                  type: object
 *                  schema:
 *                      $ref: '#/components/schemas/Project'
 */
test
    /**
     * @swagger
     * /api/v1/test/all:
     *  get:
     *      tags:
     *          - Test
     *      description: return all tests
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: an array of Test
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/Test'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .get('/all', testController.all)
    /**
     * @swagger
     * /api/v1/test/{id}:
     *  get:
     *      tags:
     *          - Test
     *      description: return test detail
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: Particular Test Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     * 
     *      responses:
     *          200:
     *              description: an object of test
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/Test'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .get('/:id', testController.getById)
    /**
     * @swagger
     * /api/v1/test/{name}/name:
     *  get:
     *      tags:
     *          - Test
     *      description: return test detail
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: name
     *            description: Particular Test Object's name
     *            in: path
     *            required: true
     *            type: string
     *      responses:
     *          200:
     *              description: an object of test
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/Test'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .get('/:name/name', testController.getByName)
    /**
     * @swagger
     * /api/v1/test/{id}/questions/{limit}:
     *  get:
     *      tags:
     *          - Test
     *      description: get questions byt test id with limit
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: Particular Test Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *          - name: limit
     *            description: particular amount for limit, default is 30
     *            in: path
     *            required: false
     *            type: string
     *      responses:
     *          200:
     *              description: an object of test
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/Test'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .get('/:id/questions/:limit', testController.getQuestions)
    /**
     * @swagger
     * /api/v1/test/{id}/questions/create:
     *  post:
     *      tags:
     *          - Question
     *      description: return new question object
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: Particular Test Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *      requestBody:
     *          description: question creation
     *          required: true
     *          content:
     *              application/json:
     *                  schema: 
     *                      $ref: '#/components/schemas/Question'
     *                  example:
     *                      question: what is your name?
     *                      answerId: 38477486389
     *              application/xml:
     *                  schema:
     *                      $ref: '#/components/schemas/Question'
     *                  example:
     *                      question: what is your name?
     *                      answerId: 38477486389
     *              application/x-www-form-urlencoded:
     *                  schema:
     *                      $ref: '#/components/schemas/Question'
     *                  example:
     *                      question: what is your name?
     *                      answerId: 38477486389
     *      responses:
     *          200:
     *              description: an array of questions
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/Question'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .post('/:id/questions/create', testController.create)
    /**
     * @swagger
     * /api/v1/test/{id}:
     *  put:
     *      tags:
     *          - Test
     *      description: return test detail
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: Particular Test Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *      requestBody:
     *          description: Test object
     *          required: true
     *          content:
     *              application/json:
     *                  schema: 
     *                      $ref: '#/components/schemas/Test'
     *                  example:
     *                      name: Title
     *                      description: description
     *                      instruction: instruction
     *              application/xml:
     *                  schema:
     *                      $ref: '#/components/schemas/Test'
     *                  example:
     *                      name: Title
     *                      description: description
     *                      instruction: instruction
     *              application/x-www-form-urlencoded:
     *                  schema:
     *                      $ref: '#/components/schemas/Test'
     *                  example:
     *                      name: Title
     *                      description: description
     *                      instruction: instruction
     *      responses:
     *          200:
     *              description: an object of test
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/Test'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .put('/:id', testController.update)
    /**
     * @swagger
     * /api/v1/test/{id}:
     *  delete:
     *      tags:
     *          - Test
     *      description: return test detail
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: Particular Test Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *      responses:
     *          200:
     *              description: test is deleted successfully
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .delete('/:id', testController.delete)

module.exports = test
