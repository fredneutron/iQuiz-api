const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const user = require('../routes/user.js')
const project = require('../routes/project.js')
const test = require('../routes/test.js')
const question = require('../routes/question.js')

class Middleware {
    // handle all route through one channel
    static connect(app, server) {
        // connect DB
        require('./connect.js')
        // setup app input and output processing
        app.use(express.json()) // for parsing application/json
        app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
        // add user routes
        const version = '/api/v1/';
        app.use(`${version}user`, user)
        app.use(`${version}project`, project)
        app.use(`${version}test`, test)
        app.use(`${version}question`, question)
        // setup swagger documentation
        const swaggerJsDocOption = {
            failOnErrors: true,
            definition: {
              openapi: "3.1.0",
              info: {
                title: "iQuiz API",
                version: "1.0.0",
                description:
                  "iQuiz is a computer based test platform available to various sector of buisness all their objective test.",
                license: {
                  name: "MIT",
                  url: "https://spdx.org/licenses/MIT.html",
                },
                contact: {
                  name: "Babatunde Adelabu",
                  url: "https://archv0rt3x.netlify.app",
                  email: "adelabu4fred@gmail.com",
                },
              },
              servers: [
                {
                  url: server,
                  description: 'Local Server',
                },
              ],
            },
            apis: ['./routes/*.js'],
            
        };
        const swaggerOpenAPISpecification = swaggerJsDoc(swaggerJsDocOption)
        app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerOpenAPISpecification));
        
    }

    static handleError(callback) {
      try {
          callback();
      } catch(error) {
          return response.status(400).json({ name: error.name, message: error.message})
      }
    }
    static handleError(callback) {
      try {
          callback();
      } catch(error) {
          return response.status(400).json({ name: error.name, message: error.message})
      }
  }
}

module.exports = Middleware