const Helper = require('../middlewares/Helper');
const Question = require('../models/Question');
const Test = require('../models/Test');
const ProjectController = require('./project');
const TestSession = require('../models/TestSession');
const TestRule = require('../models/TestRule');

class TestController {
    static async all(request, response) {
        const tests = await Test.find({}).select(['-questions']);
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

    static async getQuestions(id, limit) {
        await TestController.idVerification(Test, id);
        const question = await Question.find({ testId: id }).limit(limit);
        return question;
    }

    static async testQuestions(request, response) {
        const { id } = request.params;
        try {
            const testRules = await TestRule.findOne({ testId: id });
            await TestController.idVerification(Test, id);
            const questions = await TestController.getQuestions(id, testRules.no_of_questions);
            return response.status(200).json(questios);
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
            await TestRule.deleteOne({ testId: id });
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

    static isCandidateValid(rules, session) {
        let isValid = true;
        let message = 'Candidate can take the test.';
        // is candidate enrolled?
        if (rules.pre_enrollment === true && session === null) {
            isValid = false;
            message = 'Candidate is not enrolled for this test.'
        }
        // have candidate take the test already
        if (session !== null && session.no_of_trial >= rules.no_of_takes) {
            isValid = false;
            message = 'Candidate already take the test.'
        }

        return { result: isValid, message };
    }

    static async startTestSession(request, response) {
        const { id } = request.params;
        const { name, email } = request.body;
        try {
            const rules = await TestRule.findOne({ testId: id });
            const session = await TestSession.find({ email });
            const { isValid, message } = TestController.isCandidateValid(rules, session);
            const result = { result: isValid, message };
            if (isValid) {
                let no_of_trial = session !== null ? session.no_of_trial + 1 : 1;
                await TestSession.updateOne({ email, testId: id },
                    {
                        name,
                        email,
                        no_of_trial,
                        startTime: new Date().toISOString().split('T').join(' '),
                        testId: id
                    }, {
                        upsert: true,
                        setDefaultsOnInsert: true
                    }
                );
                const questions = await TestController.getQuestions(id, rules.no_of_questions);
                result.questions = questions
            }
            return response.status(200).json(result);
        } catch (error) {
            return response.status(400).json(Helper.reportError(error))
        }
    }

    static async endTestSession(request, response) {
        const { id } = request.params;
        const { email, score, no_of_questions, no_of_question_attempted } = request.body;
        try {
            const session = await TestSession.updateOne(
                {
                    email, testId: id
                },
                {
                    score,
                    email,
                    no_of_questions,
                    no_of_question_attempted,
                    endTime: new Date().toISOString().split('T').join(' ')
                }
            );
            if (session.acknowledged) return response.status(200).json({ message: "Test session ended successfully" });
        } catch (error) {
            return response.status(400).json(Helper.reportError(error))
        }
    }

    static async setTestRules(request, response) {
        const { id } = request.params;
        const rules = request.body;
        rules.testId = id;
        try {
            await TestController.idVerification(Test, id);
            const rules = await TestRule.updateOne({ testId: id },
                rules,
                {
                    upsert: true,
                    setDefaultsOnInsert: true
                }
            );
            return response.status(200).json(rules);
        } catch (error) {
            return response.status(400).json(Helper.reportError(error))
        }
    }

    static async getTestRules(request, response) {
        const { id } = request.params;
        try {
            await TestController.idVerification(Test, id);
            const rules = await TestRule.find({ testId: id});
            return response.status(200).json(rules);
        } catch (error) {
            return response.status(400).json(Helper.reportError(error))
        }
    }
}

module.exports = TestController