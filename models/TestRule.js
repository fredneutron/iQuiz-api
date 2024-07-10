const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const TestRuleSchema = new Schema({
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    duration: {
        type: Date,
        required: false
    },
    no_of_takes: {
        type: Number,
        required: true,
        default: 2
    },
    no_of_questions: {
        type: Number,
        required: true,
        default: 5
    },
    pre_enrollment: {
        type: Boolean,
        required: true,
        default: false
    },
    timed: {
        type: Boolean,
        required: true,
        default: false
    },
    testId: {
        type: Schema.Types.ObjectId,
        ref: 'Test'
    }
});

module.exports = mongoose.model('TestRule', TestRuleSchema);