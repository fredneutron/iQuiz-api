const Helper = require('../middlewares/Helper');
const Question = require('../models/Question');
const Test = require('../models/Test');
const ProjectController = require('./project');

class TestController {
    static async all(request, response) {
        const tests = await Test.find({});
        return response.status(200).json(tests);
    }
    static async getById(request, response) {
        const { id } = request.params;
        const test = await TestController.idVerification(Test, id, false);
        return response.status(200).json(test);
    }

    static async getByName(request, response) {
        const { name } = request.params;
        if (typeof name != 'undefined') {
            const test = await Test.findOne({ name });
            return response.status(200).json(test);
        }
        return response.status(403).json({ message: `Test name is required for this action.`});
    }

    static async getQuestions(request, response) {
        const { id, limit } = request.params;
        try {
            await TestController.idVerification(Test, id);
            const amount = typeof limit != 'undefined' ? limit : 30;
            const question = await Question.find({ testId: id }).limit(amount);
            return response.status(201).json(question);
        } catch(error) {
            return response.status(400).json(Helper.reportError(error))
        }
    }

    static async create(request, response) {
        const { id } = request.params;
        const { question, answerId } = request.body;
        try {
            const test = await TestController.idVerification(Test, id, false);
            const newQuestion = await Question.create({
                question,
                answerId,
                testId: id
            });
            test.questions.push(newQuestion.id)
            await test.save()
            return response.status(200).json(newQuestion);
        } catch(error) {
            return response.status(400).json(Helper.reportError(error))
        }
    }

    static async update(request, response) {
        const { id } = request.params;
        const { name, description, instruction  } = request.body;
        try {
            await TestController.idVerification(Test, id);
            const test = await Test.updateOne({ _id : id }, {
                name,
                description,
                instruction,
            });
            if (test.acknowledged) return response.status(200).json({ message: "Test Updated successfully"})
            return response.status(200).json(test);
        } catch(error) {
            return response.status(400).json(Helper.reportError(error))
        }
    }

    static async delete(request, response) {
        const { id } = request.params;
        try {
            await TestController.idVerification(Test, id);
            await Test.deleteOne({ _id : id });
            return response.status(200).json({ message: `test is deleted successfully.` });
        } catch(error) {
            return response.status(400).json(Helper.reportError(error))
        }
    }

    static async idVerification(Model, id, bool = true) {
        if (typeof id == 'undefined') {
            return response.status(403).json({ name: 'Verification Error', message: `${Model.collection.collectionName} id is required for this action.`});
        }
        const model = await Model.findById(id);
        if (model == null) {
            return response.status(403).json({ name: 'Validation Error', message: `${Model.collection.collectionName} id is incorrect.`});
        }
        return bool ? true : model;
    }
}

module.exports = TestController