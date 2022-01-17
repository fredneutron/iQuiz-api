const express = require('express')
const middleware = require('./middlewares/index')


const app = express()
const port = 3000

middleware.connect(app)

app.listen(port, () => {
    console.log(`Listening at  http://127.0.0.1:${port}`);
})