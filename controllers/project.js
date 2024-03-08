const Helper = require('../middlewares/Helper');
const Project = require('../models/Project');
const Test = require('../models/Test');
const User = require('../models/User');

class ProjectController {
    static async all(request, response) {
        const projects = await Project.find({});
        return response.status(200).json(projects);
    }

    static async get(request, response) {
        const { id } = request.params;
        const project = await ProjectController.idVerification(Project, id, false);
        project.tests = await Test.find({ projectId: id });
        return response.status(200).json(project);
    }

    static async create(request, response) {
        const { title, description, userId  } = request.body;
        try {
            let user = await ProjectController.idVerification(User, userId, false);
            let project = await Project.create({
                title,
                description,
                userId
            });
            user.projects.push(project.id)
            await user.save();
            return response.status(200).json(project);
        } catch(error) {
            return response.status(400).json(Helper.reportError(error))
        }
    }

    static async createTest(request, response) {
        const { id } = request.params;
        const { name, description, instruction  } = request.body;
        try {
            const project = await ProjectController.idVerification(Project, id, false);
            const test = await Test.create({ name, description, instruction, projectId: id });
            project.tests.push(test.id)
            await project.save();
            return response.status(200).json(test);
        } catch(error) {
            return response.status(400).json(Helper.reportError(error))
        }
    }

    static async update(request, response) {
        const { id } = request.params;
        const { title, description } = request.body;
        try {
            const project = await ProjectController.idVerification(Project, id);
            await ProjectController.idVerification(User, project.userId);
            const newProject = await Project.updateOne({ _id : id }, {
                title,
                description
            });
            if (newProject.acknowledged) return response.status(200).json({ message: "Project Updated successfully"});
            return response.status(200).json(newProject);
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
        await ProjectController.idVerification(Project, id, false);
        const tests = await Test.find({ projectId: id });
        return response.status(201).json(tests);
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