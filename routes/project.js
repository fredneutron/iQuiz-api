const express = require('express')
const projectController = require('../controllers/project')


const project = express.Router()

project
    /**
     * @swagger
     * /api/v1/project/all:
     *  get:
     *      tags:
     *          - Project
     *      description: return all projects
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: an array of project
     *              schema:
     *                  $ref: '#/components/schemas/Project'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .get('/all', projectController.all)
    /**
     * @swagger
     * /api/v1/project/{id}:
     *  get:
     *      tags:
     *          - Project
     *      description: return project detail
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: Particular Project Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *      responses:
     *          200:
     *              description: an object of project
     *              schema:
     *                  $ref: '#/components/schemas/Project'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .get('/:id', projectController.get)
    /**
     * @swagger
     * /api/v1/project/create:
     *  post:
     *      tags:
     *          - Project
     *      description: return project detail
     *      produces:
     *          - application/json
     *      requestBody:
     *          description: Project creation
     *          required: true
     *          content:
     *              application/json:
     *                  schema: 
     *                      $ref: '#/components/schemas/Project'
     *              application/xml:
     *                  schema:
     *                      $ref: '#/components/schemas/Project'
     *              application/x-www-form-urlencoded:
     *                  schema:
     *                      $ref: '#/components/schemas/Project'
     *              text/plain:
     *                  schema:
     *                      type: string
     * 
     *      responses:
     *          200:
     *              description: an object of project
     *              schema:
     *                  $ref: '#/components/schemas/Project'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .post('/create', projectController.create)
    /**
     * @swagger
     * /api/v1/project/{id}/test/create:
     *  post:
     *      tags:
     *          - Test
     *      description: return project's new test
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: Particular Project Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *      requestBody:
     *          description: a form of test creation
     *          required: true
     *          content:
     *              application/json
     *                  schema:
     *                      $ref: '#/components/schemas/Test'
     *              application/x-www-form-urlencoded:
     *                  schema:
     *                      $ref: '#/components/schemas/Test'
     * 
     *      responses:
     *          200:
     *              description: an object of test
     *              schema:
     *                  $ref: '#/components/schemas/Test'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .post('/:id/test/create', projectController.createTest)
    /**
     * @swagger
     * /api/v1/project/{id}:
     *  put:
     *      tags:
     *          - Project
     *      description: return project detail
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: Particular Project Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *      requestBody:
     *          description: a form of project
     *          required: true
     *          content:
     *              application/json
     *                  schema:
     *                      $ref: '#/components/schemas/Project'
     *              application/x-www-form-urlencoded:
     *                  schema:
     *                      $ref: '#/components/schemas/Project'
     * 
     *      responses:
     *          200:
     *              description: an object of project
     *              schema:
     *                  $ref: '#/components/schemas/Project'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .put('/:id', projectController.update)
    /**
     * @swagger
     * /api/v1/project/{id}:
     *  delete:
     *      tags:
     *          - Project
     *      description: return project detail
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: Particular Project Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *      response:
     *          200:
     *              description: project is deleted successfully
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .delete('/:id', projectController.delete)
    /**
     * @swagger
     * /api/v1/project/{id}/tests:
     *  get:
     *      tags:
     *          - Project
     *      description: return project detail
     *      produces:
     *          - application/json
     *      parameters:
     *          - name: id
     *            description: Particular Project Object's ID (Automatically assigned by MongoDB)
     *            in: path
     *            required: true
     *            type: string
     *      response:
     *          200:
     *              description: an array of project's tests
     *              schema:
     *                  $ref: '#/components/schema/test'
     *          500:
     *              description: SERVER ERROR
     * 
     */
    .get('/:id/tests', projectController.tests)

module.exports = project
