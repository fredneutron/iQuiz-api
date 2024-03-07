const mongoose = require('mongoose')
const Test = require('./Test');
const User = require('./User');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: {
        type: String,
        max: 35,
        required: true
    },
    description: {
        type: String,
        max: 300
    },
    tests: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Test'
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

},{ timestamps: true });

ProjectSchema.pre('deleteOne', { document: false, query: true }, async function() {
    const doc = await this.model.findOne(this.getFilter());
    const user = await User.findById(doc.userId)
    user.projects = user.projects.splice(user.projects.findIndex(e => e === doc._id), 1);
    await Test.deleteMany({ projectId: doc._id });
    await user.save();
});

ProjectSchema.pre( "deleteMany", { document: false, query: true }, async function (next) {
    const docs = await this.model.find(this.getFilter());
    const test = docs.map(async (item) => {
        const user = await User.findById(item.userId)
        user.projects = user.projects.splice(user.projects.findIndex(e => e === item._id), 1);
        return item._id;
    });
    await Test.deleteMany({ projectId: { $in: test } });
    next();
});

module.exports = mongoose.model('Project', ProjectSchema);