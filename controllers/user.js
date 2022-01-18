const User = require('../models/User')

class UserController {
    static getUser(request, response) {
        if (typeof request.params.id != 'undefined') {
            User.findById(request.params.id, function (err, user) {
                return err || response.status(201).json(user);
            });
        }
    }
    static store(request, response) {

    }
    static signIn(request, response) {
        User.findOne({ email: request.body.email }, function (err, user) {
            if (err) {
                return response.status(401).json({ message: 'Invalid username/password' });
            } else {
                user.comparePassword(password, function(matchError, isMatch) {
                    if (isMatch) {
                        return response.status(201).json(user);
                    } else {
                        return response.status(401).json({ message: 'Invalid username/password' });
                    }
                })
            }
        })
    }
}

module.exports = UserController