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
            "components": {
              "schemas": {
                "User": {
                  "type": "object",
                  "properties": {
                    "_id": {
                      "type": "string",
                      "description": "The auto-generated id of the user"
                    },
                    "firstname": {
                      "type": "string",
                      "description": "The first name of the user"
                    },
                    "lastname": {
                      "type": "string",
                      "description": "The last name of the user"
                    },
                    "email": {
                      "type": "string",
                      "description": "email of the user"
                    },
                    "password": {
                      "type": "string",
                      "description": "encrypted password of the user"
                    },
                    "dob": {
                      "type": "date",
                      "description": "date of birth of the user"
                    },
                    "gender": {
                      "type": "string",
                      "description": "gender selection of the user from the provided options"
                    }
                  }
                },
              },
            },
            apis: ['./routes/*.js'],
            
        };
        const swaggerOpenAPISpecification = swaggerJsDoc(swaggerJsDocOption)
        app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerOpenAPISpecification));
        
    }
}

module.exports = Middleware