const Test = require('../models/Test')

class TestController {
    static async get(attribute = 'id', value) {
        if (typeof value != 'undefined') {
            return (attribute == 'name') ? await Test.findOne({ name: value }) : await Test.idVerification(id, false);
        }
        return response.status(403).json({ message: `project ${attribute} is required for this action.`});
    }

    static async getById(request, response) {
        const { id } = request.params;
        const test = await TestController.get('id', id);
        return response.status(201).json(test);
    }

    static async getByName(request, response) {
        const { name } = request.params;
        const test = await TestController.get('name', name);
        return response.status(201).json(test);
    }

    static async getQuestions(request, response) {
        const { id, limit } = request.params;
        await TestController.idVerification(id);
        const amount = typeof limit != 'undefined' ? limit : 30;
        const question = await Question.find({ testId: id }).limit(amount);
        return response.status(201).json(question);
    }

    static async create(request, response) {
        const { id } = request.params;
        const { question, answerId } = request.body;
        await TestController.idVerification(id);
        let testId = id;
        const newQuestion = await Question.create({
            question,
            answerId,
            testId
        });
        return response.status(201).json(newQuestion);
    }

    static async update(request, response) {
        const { id } = request.params;
        const { name, description, instruction  } = request.body;
        await TestController.idVerification(id);
        const test = await Test.updateOne({ _id : id }, {
            name,
            description,
            instruction,
        });
        return response.status(201).json(test);
    }

    static async delete(request, response) {
        const { id } = request.params;
        await TestController.idVerification(id);
        await Test.deleteOne({ _id : id });
        return response.status(201).json({ message: `test is deleted successfully.` });
    }

    static async idVerification(id, bool = true) {
        if (typeof id == 'undefined') {
            return response.status(403).json({ message: `test id is required for this action.`});
        }
        const project = await Test.findById(id);
        if (project == null) {
            return response.status(403).json({ message: `test id is incorrect.`});
        }
        return bool ? true : project;
    }
}

module.exports = TestController