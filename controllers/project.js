const Project = require('../models/Project')

class ProjectController {
    static getProject(request, response) {
        const { id } = request.params;
        if (typeof id != 'undefined') {
            const project = await Project.findById(id).populate('user');
            return response.status(201).json(project);
        }
    }
    static getQuiz(request, response) {
        const { id } = request.params;
        if (typeof id != 'undefined') {
            const project = await Project.findById(id).populate('quiz');
            return response.status(201).json(project.quiz);
        }
    }
}

module.exports = ProjectController