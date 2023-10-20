const Question = require('../models/Question')
const Option = require('../models/Option')

class QuestionController {
    static async get(request, response) {
        const { id } = request.params;
        const question = await Question.idVerification(id, false);
        return response.status(201).json(question);

    }
    
    static async getOption(request, response) {
        const { id, optionId } = request.params;
        await QuestionController.idVerification(id);
        const option = await Option.find({ questionId: id, _id: optionId });
        return response.status(201).json(option);

    }

    static async getOptions(request, response) {
        const { id, limit } = request.params;
        await QuestionController.idVerification(id);
        const amount = typeof limit != 'undefined' ? limit : 4;
        const option = await Option.find({ questionId: id }).limit(amount);
        return response.status(201).json(option);
    }

    static async create(request, response) {
        const { id } = request.params;
        const { answer } = request.body;
        await QuestionController.idVerification(id);
        let questionId = id;
        const option = await Option.create({
            answer,
            questionId
        });
        return response.status(201).json(option);
    }

    static async update(request, response) {
        const { id } = request.params;
        const { question, answerId } = request.body;
        await QuestionController.idVerification(id);
        const newQuestion = await Question.updateOne({ _id : id }, {
            question,
            answerId
        });
        return response.status(201).json(newQuestion);
    }

    static async updateOption(request, response) {
        const { id, optionId } = request.params;
        const { answer } = request.body;
        await QuestionController.idVerification(id);
        const newOption = await Option.updateOne({ _id : optionId, questionId: id }, {
            answer
        });
        return response.status(201).json(newOption);
    }

    static async delete(request, response) {
        const { id } = request.params;
        await QuestionController.idVerification(id);
        await Question.deleteOne({ _id : id });
        return response.status(201).json({ message: `question deleted successfully.` });
    }

    static async deleteOption(request, response) {
        const { id, optionId } = request.params;
        await QuestionController.idVerification(id);
        await Option.deleteOne({ _id : optionId, questionId: id });
        return response.status(201).json({ message: `option deleted successfully.` });
    }

    static async idVerification(id, bool = true) {
        if (typeof id == 'undefined') {
            return response.status(403).json({ message: `question id is required for this action.`});
        }
        const project = await Question.findById(id);
        if (project == null) {
            return response.status(403).json({ message: `question id is incorrect.`});
        }
        return bool ? true : project;
    }
}

module.exports = QuestionController;