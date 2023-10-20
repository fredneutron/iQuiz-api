const mongoose = require('../middlewares/connect');


const OptionSchema = new mongoose.Schema({
    answer: {
        type: String,
        required: true
    },
    questionId: {
        type: mongoose.Types.ObjectId,
        ref: 'Question'
    }

});

module.exports = mongoose.model('Option', OptionSchema);