const connect = require('./connect');
const bcrypt = require('bcryptjs');


const ProjectSchema = new connect.Schema({
    title: {
        type: String,
        max: 35,
        required: true
    },
    description: {
        type: String,
    },
    questions: {
        type: Number,
        required: true
    },
    user: {
        type: connect.Schema.Types.ObjectId,
        ref: 'User'
    },
    quiz: [{
        type: connect.Schema.Types.ObjectId,
        ref: 'Quiz'
    }]

});

module.exports = mongoose.model('Project', ProjectSchema);