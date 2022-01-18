const user = require('../routes/user.js')

class Middleware {
    // handle all route through one channel
    static connect(app) {
        // add user routes
        app.use('/user', user)
    }
}

module.exports = Middleware