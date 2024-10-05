import { ProjectModel } from './project.schema.js';

export default class ProjectRepository {
    
    // Create a new project
    async addProject(name, description, createdBy, teamMembers = [], tasks = [], status = 'To-Do') {
        try {
            const newProject = new ProjectModel({
                name,
                description,
                createdBy,
                teamMembers,
                tasks,
                status
            });
            await newProject.save();
            return newProject;
        } catch (err) {
            console.log('Error while creating project: ', err);
            throw new Error(err);
        }
    }

    // Get all projects for a specific user
    async getProjectsByUser(userId) {
        try {
            const projects = await ProjectModel.find({ teamMembers: userId })
                .populate('createdBy', 'name email')
                .populate('teamMembers', 'name email')
                .populate('tasks');
            return projects;
        } catch (err) {
            console.log('Error while fetching projects: ', err);
            throw new Error(err);
        }
    }

    // Update a project
    async updateProject(projectId, updateData) {
        try {
            const updatedProject = await ProjectModel.findByIdAndUpdate(
                projectId,
                { $set: updateData },
                { new: true }
            ).populate('teamMembers', 'name email').populate('tasks');
            
            if (!updatedProject) {
                throw new Error(`Project with ID ${projectId} not found`);
            }

            return updatedProject;
        } catch (err) {
            console.log('Error while updating project: ', err);
            throw new Error(err);
        }
    }

    // Delete a project
    async deleteProject(projectId) {
        try {
            const deletedProject = await ProjectModel.findByIdAndDelete(projectId);

            if (!deletedProject) {
                throw new Error(`Project with ID ${projectId} not found`);
            }

            return deletedProject;
        } catch (err) {
            console.log('Error while deleting project: ', err);
            throw new Error(err);
        }
    }
}
