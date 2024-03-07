const Middleware = require('../middlewares');
const Helper = require('../middlewares/Helper');
const User = require('../models/User')


class UserController {
    static async all(request, response) {
        const users = await User.find({});
        return response.status(200).json(users);
    }

    static async getUser(request, response) {
        const { id } = request.params;
        const user = await UserController.idVerification(id, false);
        return response.status(200).json(user);
    }

    static async signUp(request, response) {
        try {
            const user = await User.create(request.body)
            return response.status(200).json(user)
        } catch(error) {
            return response.status(400).json(Helper.reportError(error))
        }
    }

    static signIn(request, response) {
        User.findOne({ email: request.body.email }, function (err, user) {
            if (err) {
                return response.status(401).json({ message: 'Invalid username/password' });
            } else {
                user.comparePassword(request.body.password, function(matchError, isMatch) {
                    if (isMatch) {
                        return response.status(200).json(user);
                    } else {
                        return response.status(401).json({ message: 'Invalid username/password' });
                    }
                })
            }
        })
    }

    static async update(request, response) {
        const { id } = request.params;
        try {
            await UserController.idVerification(id);
            const user = await User.updateOne({_id: id}, request.body)
            return response.status(200).json(user);
        } catch(error) {
            return response.status(400).json(Helper.reportError(error))
        }
    }
    
    static async getProjects(request, response) {
        const { id } = request.params;
        try {
            const userDetail = await UserController.idVerification(id, false)
            const user = userDetail.projects;
            return response.status(200).json(user);
        } catch(error) {
            return response.status(400).json(Helper.reportError(error))
        }
    }

    static async idVerification(id, bool = true) {
        if (typeof id == 'undefined') {
            return response.status(403).json({ name: 'Verification Error', message: `User id is required for this action.`});
        }
        const model = await User.findById(id);
        if (model == null) {
            return response.status(403).json({ name: 'Validation Error', message: `User id is incorrect.`});
        }
        return bool ? true : model;
      }
}

module.exports = UserController