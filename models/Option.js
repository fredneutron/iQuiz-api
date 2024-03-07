const mongoose = require('mongoose');
const Question = require('./Question');

const Schema = mongoose.Schema;

const OptionSchema = new Schema({
    answer: {
        type: String,
        required: true
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }

});

OptionSchema.pre('deleteOne', { document: false, query: true }, async function() {
    const doc = await this.model.findOne(this.getFilter());
    const question = await Question.findById(doc.questionId)
    question.options = question.options.splice(question.options.findIndex(e => e === doc._id), 1);
    await question.save();
});

OptionSchema.pre( "deleteMany", { document: false, query: true }, async function (next) {
    const docs = await this.model.find(this.getFilter());
    docs.map(async (item) => {
        const question = await Question.findById(item.questionId)
        question.options = question.options.splice(question.options.findIndex(e => e === item._id), 1);
        await question.save();
        return item._id;
    });
    next();
});

module.exports = mongoose.model('Option', OptionSchema);