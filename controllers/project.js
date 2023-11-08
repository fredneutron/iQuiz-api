const Project = require('../models/Project');
const User = require('../models/User');
const TestController = require('./test');
const UserController = require('./user');

class ProjectController {
    static async all(request, response) {
        const projects = await Project.find({});
        return response.status(200).json(projects);
    }

    static async get(request, response) {
        const { id } = request.params;
        const project = await ProjectController.idVerification(Project, id, false);
        return response.status(201).json(project);
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
            return response.status(400).json({ name: error.name, message: error.message})
        }
    }

    static async createTest(request, response) {
        const { id } = request.params;
        const { name, description, instruction  } = request.body;
        try {
            await ProjectController.idVerification(Project, id);
            let projectId = id;
            const test = await TestController.create({name, description, instruction, projectId});
            return response.status(200).json(test);
        } catch(error) {
            return response.status(400).json({ name: error.name, message: error.message})
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
            return response.status(200).json(res);
        } catch(error) {
            return response.status(400).json({ name: error.name, message: error.message})
        }
    }

    static async delete(request, response) {
        const { id } = request.params;
        try {
            await ProjectController.idVerification(Project, id);
            await Project.deleteOne({ _id : id });
            return response.status(200).json({ message: `project is deleted successfully.` });
        } catch(error) {
            return response.status(400).json({ name: error.name, message: error.message})
        }
    }

    static async tests(request, response) {
        const { id } = request.params;
        const project = await ProjectController.idVerification(Project, id, false);
        return response.status(201).json(project.tests);
    }

    static async idVerification(Model, id, bool = true) {
        if (typeof id == 'undefined') {
            return this.response.status(403).json({ name: 'Verification Error', message: `${Model.collection.collectionName} id is required for this action.`});
        }
        const model = await Model.findById(id);
        if (model == null) {
            return this.response.status(403).json({ name: 'Validation Error', message: `${Model.collection.collectionName} id is incorrect.`});
        }
        return bool ? true : model;
      }
}

module.exports = ProjectController