const mongoose = require('../middlewares/connect')
const Option = require('./Option')


const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answerId: {
        type: mongoose.Types.ObjectId,
        ref: 'Option'
    },
    testId: {
        type: mongoose.Types.ObjectId,
        ref: 'Test'
    },
    options: [{
        type: mongoose.Types.ObjectId,
        ref: 'Option'
    }]

});

QuestionSchema.pre('deleteOne', { document: false, query: true }, async function() {
    const doc = await this.model.findOne(this.getFilter());
    await Option.deleteMany({ questionId: doc._id });
});

QuestionSchema.pre( "deleteMany", { document: false, query: true }, async function (next) {
    const docs = await this.model.find(this.getFilter());
    const question = docs.map((item) => item._id);
    await Option.deleteMany({ questionId: { $in: question } });
    next();
});

module.exports = mongoose.model('Question', QuestionSchema);