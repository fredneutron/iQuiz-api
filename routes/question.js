const express = require('express')
const questionController = require('../controllers/question')


const question = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      Question:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  description: The auto-generated id of the question
 *              question:
 *                  type: string
 *                  description: question
 *                  required: true
 *              answerId:
 *                  type: object
 *                  schema:
 *                      $ref: '#/components/schemas/Option'
 *              testId:
 *                  type: object
 *                  schema:
 *                      $ref: '#/components/schemas/Test'
 *      Option:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  description: The auto-generated id of the option
 *              answer:
 *                  type: string
 *                  description: answer
 *              questionId:
 *                  type: object
 *                  schema:
 *                      $ref: '#/components/schemas/Question'
 */
question
    /**
     * @swagger
     * /api/v1/question/all:
     *  get:
     *      tags:
     *          - Question
     *      description: return all questions
     *      produces:
     *          - application/json
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
    .get('/all', questionController.all)
    /**
     * @swagger
     * /api/v1/question/{id}:
     *  get:
     *      tags:
     *          - Question
     *      description: return question detail
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: Particular Question Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *      responses:
     *          200:
     *              description: an object of question
     *              schema:
     *                  $ref: '#/components/schema/Question'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .get('/:id', questionController.get)
    /**
     * @swagger
     * /api/v1/question/options/all:
     *  get:
     *      tags:
     *          - Option
     *      description: return all options
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: an array of options
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/Option'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .get('options/all', questionController.optionAll)
    /**
     * @swagger
     * /api/v1/question/{id}/options/{optionId}:
     *  get:
     *      tags:
     *          - Option
     *      description: return option detail
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: Particular Question Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *          - name: optionId
     *            description: Particular Option Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *      responses:
     *          200:
     *              description: an object of option
     *              schema:
     *                  $ref: '#/components/schema/Option'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .get('/:id/options/:optionId', questionController.getOption)
    /**
     * @swagger
     * /api/v1/question/{id}/options/{limit}:
     *  get:
     *      tags:
     *          - Option
     *      description: return array of options of a question with limit
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: Particular Question Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *          - name: limit
     *            description: particular amount for limit, default is 4
     *            in: path
     *            required: false
     *            type: string
     *      responses:
     *          200:
     *              description: an array of options
     *              schema:
     *                  $ref: '#/components/schema/Option'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .get('/:id/options/:limit', questionController.getOptions)
    /**
     * @swagger
     * /api/v1/question/{id}/options/create:
     *  post:
     *      tags:
     *          - Option
     *      description: return new option object
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: Particular Question Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *      requestBody:
     *          description: option object
     *          required: true
     *          content:
     *              application/json:
     *                  schema: 
     *                      $ref: '#/components/schemas/Option'
     *                  example:
     *                      answer: what is your name?
     *              application/xml:
     *                  schema:
     *                      $ref: '#/components/schemas/Option'
     *                  example:
     *                      answer: what is your name?
     *              application/x-www-form-urlencoded:
     *                  schema:
     *                      $ref: '#/components/schemas/Option'
     *                  example:
     *                      answer: what is your name?
     *      responses:
     *          200:
     *              description: an object of new option
     *              schema:
     *                  $ref: '#/components/schema/Option'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .post('/:id/options/create', questionController.create)
    /**
     * @swagger
     * /api/v1/question/{id}:
     *  put:
     *      tags:
     *          - Question
     *      description: return question detail
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: Particular Question Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *      requestBody:
     *          description: question update
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
     *              description: an update object of question
     *              schema:
     *                  $ref: '#/components/schema/Question'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .put('/:id', questionController.update)
    /**
     * @swagger
     * /api/v1/question/{id}/options/{optionId}:
     *  put:
     *      tags:
     *          - Option
     *      description: return option detail
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: Particular Question Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *          - name: optionId
     *            description: Particular Option Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *      requestBody:
     *          description: option object
     *          required: true
     *          content:
     *              application/json:
     *                  schema: 
     *                      $ref: '#/components/schemas/Option'
     *                  example:
     *                      answer: what is your name?
     *              application/xml:
     *                  schema:
     *                      $ref: '#/components/schemas/Option'
     *                  example:
     *                      answer: what is your name?
     *              application/x-www-form-urlencoded:
     *                  schema:
     *                      $ref: '#/components/schemas/Option'
     *                  example:
     *                      answer: what is your name?
     *      responses:
     *          200:
     *              description: an update object of option
     *              schema:
     *                  $ref: '#/components/schema/option'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .put('/:id/options/:optionId', questionController.updateOption)
    /**
     * @swagger
     * /api/v1/question/{id}:
     *  delete:
     *      tags:
     *          - Question
     *      description: return json message
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: Particular Question Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *      responses:
     *          200:
     *              description: question is deleted successfully
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .delete('/:id', questionController.delete)
    /**
     * @swagger
     * /api/v1/question/{id}/options/{optionId}:
     *  delete:
     *      tags:
     *          - Option
     *      description: return json message
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: Particular Question Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *          - name: optionId
     *            description: Particular Option Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *      responses:
     *          200:
     *              description: option is deleted successfully
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .delete('/:id/options/:optionId', questionController.deleteOption)

module.exports = question
