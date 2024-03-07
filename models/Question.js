const mongoose = require('mongoose')
const Option = require('./Option')
const Test = require('./Test')

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answerId: {
        type: Schema.Types.ObjectId,
        ref: 'Option'
    },
    testId: {
        type: Schema.Types.ObjectId,
        ref: 'Test'
    },
    options: [{
        type: Schema.Types.ObjectId,
        ref: 'Option'
    }]

});

QuestionSchema.pre('deleteOne', { document: false, query: true }, async function() {
    const doc = await this.model.findOne(this.getFilter());
    const test = await Test.findById(doc.testId)
    test.questions = test.questions.splice(test.questions.findIndex(e => e === doc._id), 1);
    await Option.deleteMany({ questionId: doc._id });
    await test.save();
});

QuestionSchema.pre( "deleteMany", { document: false, query: true }, async function (next) {
    const docs = await this.model.find(this.getFilter());
    const question = docs.map(async (item) => {
        const test = await Test.findById(item.testId)
        test.questions = test.questions.splice(test.questions.findIndex(e => e === item._id), 1);
        await test.save();
        return item._id;
    });
    await Option.deleteMany({ questionId: { $in: question } });
    next();
});

module.exports = mongoose.model('Question', QuestionSchema);