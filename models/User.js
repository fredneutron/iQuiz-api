const mongoose = require('../middlewares/connect')
const bcrypt = require('bcryptjs')

const saltRounds = 10

/**
 * @swagger
 * User:
 *  type: object
 *  properties:
 *    _id:
 *      type: string
 *      description: The auto-generated id of the user
 *    firstname:
 *      type: string
 *      description: The first name of the user
 *    lastname:
 *      type: string
 *      description: The last name of the user
 *    email:
 *      type: string
 *      description: email of the user
 *    password:
 *      type: string
 *      description: encrypted password of the user
 *    dob:
 *      type: date
 *      description: date of birth of the user
 *    gender:
 *      type: string
 *      description: gender selection of the user from the provided options
 *          
 */

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        max: 35,
        required: true
    },
    lastname: {
        type: String,
        max: 35,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
              return '/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
          },
          required: [true, 'User email address is required']
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    projects: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Project'
      }
    ]
},{ timestamps: true });
//set pre save
UserSchema.pre("save", function (next) {
    const user = this
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(saltRounds, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(user.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            user.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
})
// schema methods
UserSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
      if (error) {
        return callback(error)
      } else {
        callback(null, isMatch)
      }
    })
  }

module.exports = mongoose.model('User', UserSchema);