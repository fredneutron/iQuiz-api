const express = require('express')
const testController = require('../controllers/test')


const test = express.Router()

test
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
     *      response:
     *          200:
     *              description: an object of test
     *              schema:
     *                  $ref: '#/components/schema/test'
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
     *      response:
     *          200:
     *              description: an object of test
     *              schema:
     *                  $ref: '#/components/schema/test'
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
     *      response:
     *          200:
     *              description: an array of questions
     *              schema:
     *                  $ref: '#/components/schema/test'
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
     *          - name: question
     *            description: a form of question creation
     *            in: body
     *            required: true
     *            schema:
     *              $ref: '#/components/schema/question'
     *      response:
     *          200:
     *              description: an object of question
     *              schema:
     *                  $ref: '#/components/schema/question'
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
     *          - name: Test
     *            description: updated object of Test
     *            in: body
     *            required: true
     *            schema:
     *              $ref: '#/components/schema/test'
     *      response:
     *          200:
     *              description: an object of test
     *              schema:
     *                  $ref: '#/components/schema/test'
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
     *      response:
     *          200:
     *              description: test is deleted successfully
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .delete('/:id', testController.delete)

module.exports = test
