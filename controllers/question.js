const Question = require('../models/Question')
const Option = require('../models/Option')
const Helper = require('../middlewares/Helper');

class QuestionController {
    static async all(request, response) {
        const questions = await Question.find({});
        return response.status(200).json(questions);
    }

    static async get(request, response) {
        const { id } = request.params;
        const question = await QuestionController.idVerification(id, false);
        return response.status(200).json(question);

    }
    
    static async getOption(request, response) {
        const { id, optionId } = request.params;
        try {
            await QuestionController.idVerification(id);
            const option = await Option.find({ questionId: id, _id: optionId });
            return response.status(200).json(option);
        }  catch(error) {
            return response.status(400).json(Helper.reportError(error))
        }

    }

    static async optionAll(request, response) {
        const options = await Option.find({});
        return response.status(200).json(options);
    }

    static async getOptions(request, response) {
        const { id, limit } = request.params;
        try {
            await QuestionController.idVerification(id);
            const amount = typeof limit != 'undefined' ? limit : "4";
            const option = await Option.find({ questionId: id }).limit(amount);
            return response.status(200).json(option);
        } catch(error) {
            return response.status(400).json(Helper.reportError(error))
        }
    }

    static async create(request, response) {
        const { id } = request.params;
        const { answer } = request.body;
        try {
            const question = await QuestionController.idVerification(id, false);
            let questionId = id;
            const option = await Option.create({
                answer,
                questionId
            });
            question.options.push(option.id);
            await question.save();
            return response.status(200).json(option);
        } catch(error) {
            return response.status(400).json(Helper.reportError(error))
        }
    }

    static async update(request, response) {
        const { id } = request.params;
        const { question, answerId } = request.body;
        try {
            await QuestionController.idVerification(id);
            const newQuestion = await Question.updateOne({ _id : id }, {
                question,
                answerId
            });
            if (newQuestion.acknowledged) return response.status(200).json({ message: "Question Updated successfully"})
            return response.status(200).json(newQuestion);
        } catch(error) {
            return response.status(400).json(Helper.reportError(error))
        }
    }

    static async updateOption(request, response) {
        const { id, optionId } = request.params;
        const { answer } = request.body;
        try {
            await QuestionController.idVerification(id);
            const newOption = await Option.updateOne({ _id : optionId, questionId: id }, {
                answer
            });
            if (newOption.acknowledged) return response.status(200).json({ message: "Option Updated successfully"})
            return response.status(200).json(newOption);
        } catch(error) {
            return response.status(400).json(Helper.reportError(error))
        }
    }

    static async delete(request, response) {
        const { id } = request.params;
        try {
            await QuestionController.idVerification(id);
            await Question.deleteOne({ _id : id });
            return response.status(200).json({ message: `question deleted successfully.` });
        } catch(error) {
            return response.status(400).json(Helper.reportError(error))
        }
    }

    static async deleteOption(request, response) {
        const { id, optionId } = request.params;
        try {
            await QuestionController.idVerification(id);
            await Option.deleteOne({ _id : optionId, questionId: id });
            return response.status(200).json({ message: `option deleted successfully.` });
        } catch(error) {
            return response.status(400).json(Helper.reportError(error))
        }
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