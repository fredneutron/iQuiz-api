const Helper = require('../middlewares/Helper');
const Project = require('../models/Project');
const Test = require('../models/Test');
const User = require('../models/User');
const TestController = require('./test');

class ProjectController {
    static async all(request, response) {
        const projects = await Project.find({}).populate({ path: 'tests', model: 'Test'});
        return response.status(200).json(projects);
    }

    static async get(request, response) {
        const { id } = request.params;
        // const project = await new Helper(response).idVerification(Project, id, false);
        const project = await ProjectController.idVerification(Project, id, false);
        return response.status(200).json(project);
    }

    static async create(request, response) {
        const { title, description, userId  } = request.body;
        try {
            await ProjectController.idVerification(User, id);
            const res = await Project.create({
                title,
                description,
                userId
            });
            return response.status(200).json(res);
        } catch(error) {
            return response.status(400).json(Helper.reportError(error))
        }
    }

    static async createTest(request, response) {
        const { id } = request.params;
        const { name, description, instruction  } = request.body;
        try {
            await ProjectController.idVerification(Project, id);
            const test = await Test.create({name, description, instruction, projectId: id});
            return response.status(200).json(test);
        } catch(error) {
            return response.status(400).json(Helper.reportError(error))
        }
    }

    static async update(request, response) {
        const { id } = request.params;
        const { title, description, userId  } = request.body;
        try {
            await ProjectController.idVerification(Project, id);
            await ProjectController.idVerification(User, id);
            const res = await Project.updateOne({ _id : id }, {
                title,
                description,
                userId
            });
            if (res.acknowledged) return response.status(200).json({ message: "Project Updated successfully"})
            return response.status(200).json(res);
        } catch(error) {
            return response.status(400).json(Helper.reportError(error))
        }
    }

    static async delete(request, response) {
        const { id } = request.params;
        try {
            await ProjectController.idVerification(Project, id);
            await Project.deleteOne({ _id : id });
            return response.status(200).json({ message: `project is deleted successfully.` })
        } catch(error) {
            return response.status(400).json(Helper.reportError(error))
        }
    }

    static async tests(request, response) {
        const { id } = request.params;
        const project = await ProjectController.idVerification(Project, id, false);
        return response.status(201).json(project.tests);
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

module.exports = ProjectController