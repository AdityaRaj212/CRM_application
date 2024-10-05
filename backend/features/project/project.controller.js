import ProjectRepository from "./project.repository.js";

export default class ProjectController {
    constructor() {
        this.projectRepository = new ProjectRepository();
    }

    // Add a new project
    async addProject(req, res) {
        try {
            const { name, description, createdBy, teamMembers, tasks } = req.body;
            const newProject = await this.projectRepository.addProject(name, description, createdBy, teamMembers, tasks);
            return res.status(201).json({
                status: true,
                project: newProject
            });
        } catch (err) {
            console.error('Error while creating project: ', err);
            return res.status(500).json({ message: 'Error creating project', error: err.message });
        }
    }

    // Get projects by user
    async getProjectsByUser(req, res) {
        try {
            const { userId } = req.params;
            const projects = await this.projectRepository.getProjectsByUser(userId);
            return res.status(200).json({
                status: true,
                projects
            });
        } catch (err) {
            console.error('Error while fetching projects: ', err);
            return res.status(500).json({ message: 'Error fetching projects', error: err.message });
        }
    }

    // Update a project
    async updateProject(req, res) {
        try {
            const { projectId } = req.params;
            const updateData = req.body;
            const updatedProject = await this.projectRepository.updateProject(projectId, updateData);
            return res.status(200).json({
                status: true,
                project: updatedProject
            });
        } catch (err) {
            console.error('Error while updating project: ', err);
            return res.status(500).json({ message: 'Error updating project', error: err.message });
        }
    }

    // Delete a project
    async deleteProject(req, res) {
        try {
            const { projectId } = req.params;
            const deletedProject = await this.projectRepository.deleteProject(projectId);
            return res.status(200).json({
                status: true,
                message: 'Project deleted successfully',
                project: deletedProject
            });
        } catch (err) {
            console.error('Error while deleting project: ', err);
            return res.status(500).json({ message: 'Error deleting project', error: err.message });
        }
    }
}
