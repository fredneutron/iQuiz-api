const connect = require('./connect');


const QuizSchema = new connect.Schema({
    question: {
        type: String,
        required: true
    },
    options: [{
        type: connect.Schema.Types.ObjectId,
        ref: 'Option'
    }],
    answer: {
        type: connect.Schema.Types.ObjectId,
        ref: 'Option'
    },
    project: {
        type: connect.Schema.Types.ObjectId,
        ref: 'Project'
    }

});

module.exports = mongoose.model('Quiz', QuizSchema);