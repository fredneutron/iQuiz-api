const express = require('express')
const questionController = require('../controllers/question')


const question = express.Router()

question
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
     *      response:
     *          200:
     *              description: an object of question
     *              schema:
     *                  $ref: '#/components/schema/question'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .get('/:id', questionController.get)
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
     *      response:
     *          200:
     *              description: an object of option
     *              schema:
     *                  $ref: '#/components/schema/option'
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
     *      response:
     *          200:
     *              description: an array of options
     *              schema:
     *                  $ref: '#/components/schema/option'
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
     *          - name: option
     *            description: form of option's creation
     *            in: body
     *            required: true
     *            schema:
     *              $ref: '#/components/schema/option'
     *      response:
     *          200:
     *              description: an object of new option
     *              schema:
     *                  $ref: '#/components/schema/option'
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
     *          - name: question
     *            description: an updated object of question
     *            in: body
     *            required: true
     *            schema:
     *              $ref: '#/components/schema/question'
     *      response:
     *          200:
     *              description: an update object of question
     *              schema:
     *                  $ref: '#/components/schema/question'
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
     *          - name: option
     *            description: an updated object of option
     *            in: body
     *            required: true
     *            schema:
     *              $ref: '#/components/schema/option'
     *      response:
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
     *      response:
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
     *      response:
     *          200:
     *              description: option is deleted successfully
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .delete('/:id/options/:optionId', questionController.deleteOption)

module.exports = question
