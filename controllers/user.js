const User = require('../models/User')

class UserController {
    static getUser(request, response) {
        const { id } = request.params;
        if (typeof id != 'undefined') {
            User.findById(id, function (err, user) {
                return err || response.status(201).json(user);
            });
        }
    }
    static async signUp(request, response) {
        const user = await User.create(request.body)
        return response.status(201).json(user)
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

    static update(request, response) {
        const { id } = request.params;
        if (typeof id != 'undefined') {
            User.findByIdAndUpdate(id, request.body, function(err, user) {
                if (err) {
                    return response.status(404).json({ message: 'user not found' });
                } else {
                    return response.status(201).json(user);
                }
            })
        }
    }
    
    static async getProjects(request, response) {
        const { id } = request.params;
        if (typeof id != 'undefined') {
            const user = await User.findById(id).populate('projects');
            return response.status(201).json(user.projects);
        }
    }
}

module.exports = UserController