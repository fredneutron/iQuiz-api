const mongoose = require('../middlewares/connect')
const bcrypt = require('bcryptjs')
const Test = require('./Test')

/**
 * @swagger
 * Project:
 *  type: object
 *  properties:
 *      title:
 *          type: string
 *          required: true
 *          maximum: 35
 *      description:
 *          type: string
 *          required: false
 *          maximum: 300
 *      userId:
 *          type: object
 *          schema:
 *              ref: '#/components/schemas/user'
 */
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
        type: mongoose.Types.ObjectId,
        ref: 'Test'
    }],
    userId: {
        type: mongoose.Types.ObjectId,
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