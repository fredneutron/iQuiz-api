const Project = require('../models/Project')
const TestController = require('./test')

class ProjectController {
    static async all(request, response) {
        const projects = await Project.find({});
        return response.status(200).json(projects);
    }

    static async get(request, response) {
        const { id } = request.params;
        const project = await ProjectController.idVerification(id, false);
        return response.status(201).json(project);
    }

    static async create(request, response) {
        const { title, description, userId  } = request.body;
        let user = userId
        const res = await Project.create({
            title,
            description,
            user
        });
        return response.status(201).json(res);
    }

    static async createTest(request, response) {
        const { id } = request.params;
        const { name, description, instruction  } = request.body;
        await ProjectController.idVerification(id);
        let projectId = id;
        const test = await TestController.create({name, description, instruction, projectId});
        return response.status(201).json(test);
    }

    static async update(request, response) {
        const { id } = request.params;
        await ProjectController.idVerification(id);
        const res = await Project.updateOne({ _id : id }, {
            title,
            description
        });
        return response.status(201).json(res);
    }

    static async delete(request, response) {
        const { id } = request.params;
        await ProjectController.idVerification(id);
        await Project.deleteOne({ _id : id });
        return response.status(201).json({ message: `project is deleted successfully.` });
    }

    static async tests(request, response) {
        const { id } = request.params;
        const project = await ProjectController.idVerification(id, false);
        return response.status(201).json(project.tests);
    }

    static async idVerification(id, bool = true) {
        if (typeof id == 'undefined') {
            return response.status(403).json({ message: `project id is required for this action.`});
        }
        const project = await Project.findById(id);
        if (project == null) {
            return response.status(403).json({ message: `project id is incorrect.`});
        }
        return bool ? true : project;
    }
}

module.exports = ProjectController