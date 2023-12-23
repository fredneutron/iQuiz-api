const mongoose = require('../middlewares/connect')
const bcrypt = require('bcryptjs')
const Test = require('./Test')


const ProjectSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

},{ timestamps: true });

ProjectSchema.pre('deleteOne', { document: false, query: true }, async function() {
    const doc = await this.model.findOne(this.getFilter());
    await Test.deleteMany({ projectId: doc._id });
});

ProjectSchema.pre( "deleteMany", { document: false, query: true }, async function (next) {
    const docs = await this.model.find(this.getFilter());
    const test = docs.map((item) => item._id);
    await Test.deleteMany({ projectId: { $in: test } });
    next();
});

module.exports = mongoose.model('Project', ProjectSchema);