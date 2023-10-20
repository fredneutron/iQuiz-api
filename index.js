const express = require('express')
const middleware = require('./middlewares/index')


const app = express()
const port = 3001
const host = '127.0.0.1'
const server = `http://${host}:${port}`;

middleware.connect(app, server)

app.listen(port, () => {
    console.log(`Listening at  ${server}`);
})