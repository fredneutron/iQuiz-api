const mongoose = require('mongoose')
const Question = require('./Question');
const Project = require('./Project');

const Schema = mongoose.Schema;

const TestSchema = new Schema({
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
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }],
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }

},{ timestamps: true });

TestSchema.pre('deleteOne', { document: false, query: true }, async function() {
    const doc = await this.model.findOne(this.getFilter());
    const project = await Project.findById(doc.projectId)
    project.tests = project.tests.splice(project.tests.findIndex(e => e === doc._id), 1);
    await Question.deleteMany({ testId: doc._id });
    await project.save()
});

TestSchema.pre( "deleteMany", { document: false, query: true }, async function (next) {
    const docs = await this.model.find(this.getFilter());
    const test = docs.map(async (item) => {
        const project = await Project.findById(item.projectId)
        project.tests = project.tests.splice(project.tests.findIndex(e => e === item._id), 1);
        await project.save();
        return item._id;
    });
    await Question.deleteMany({ testId: { $in: test } });
    next();
});

module.exports = mongoose.model('Test', TestSchema);