const connect = require('./connect');


const OptionSchema = new connect.Schema({
    answer: {
        type: String,
        required: true
    },
    quiz: {
        type: connect.Schema.Types.ObjectId,
        ref: 'Quiz'
    }

});

module.exports = mongoose.model('Option', OptionSchema);