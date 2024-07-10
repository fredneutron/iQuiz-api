const mongoose = require('mongoose')

const Schema = mongoose.Schema;
// check if email is available in Test session, then check if session has end time, if not, check the no_of_takes on TestRule Model and report if candidate can still take the test (add 1 to the no_of trial on TestSession Model) or not.
const TestSessionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(valid) {
              return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(valid);
            },
            message: props => `${props.value} is not a valid email address!`
        },
        required: [true, 'User email address is required']
    },
    no_of_trial: {
        type: Number,
        reqiured: true,
        default: 0
    },
    startTime: {},
    endTime: {},
    score: {
        type: Number,
        required: true,
        default: 0
    },
    no_of_questions: {
        type: Number,
        required: true,
        default: 0
    },
    no_of_question_attempted: {
        type: Number,
        required: true,
        default: 0
    },
    testId: {
        type: Schema.Types.ObjectId,
        ref: 'Test'
    }
},{ timestamps: true });

module.exports = mongoose.model('TestSession', TestSessionSchema);