const mongoose = require('../middlewares/connect')
const Question = require('./Question')


const TestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instruction: {
        type: String,
        required: false
    },
    question: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }

},{ timestamps: true });

TestSchema.pre('deleteOne', { document: false, query: true }, async function() {
    const doc = await this.model.findOne(this.getFilter());
    await Question.deleteMany({ testId: doc._id });
});

TestSchema.pre( "deleteMany", { document: false, query: true }, async function (next) {
    const docs = await this.model.find(this.getFilter());
    const test = docs.map((item) => item._id);
    await Question.deleteMany({ testId: { $in: test } });
    next();
});

module.exports = mongoose.model('Test', TestSchema);