import TaskRepository from './task.repository.js';
import DocumentRepository from '../document/document.repository.js';
import { TaskModel } from './task.schema.js';

export default class TaskController {
    constructor() {
        this.taskRepository = new TaskRepository();
        this.documentRepository = new DocumentRepository();
    }

    // async addTask(req, res) {
    //     try {
    //         console.log(req.body);
    //         const { name, description, assignedTo, createdBy, dueDate } = req.body;
    //         const newTask = await this.taskRepository.addTask(name, description, assignedTo, createdBy, dueDate);
    //         return res.status(201).json({
    //             status: true,
    //             task: newTask
    //         });
    //     } catch (err) {
    //         console.error('Error while creating task: ', err);
    //         return res.status(500).json({ message: 'Error creating task', error: err.message });
    //     }
    // }

    async addTask(req, res) {
        try {
          console.log(req.body);
          const { name, description, dueDate, assignedTo, checkpoints, comments } = req.body;
          console.log(checkpoints);
      
          // Ensure `name` is provided
          if (!name) {
            return res.status(400).json({ message: 'Task name is required' });
          }
      
          // Create a new task object
          const newTask = {
            name,
            description,
            dueDate,
            assignedTo,
            checkpoints: checkpoints.map(cp => ({
              description: cp.description,
              completed: cp.completed,
            })),
            attachments: []
          };

          if (req.file) {
            const documentData = {
            userId: assignedTo,
            filename: req.file.originalname,
            filePath: req.file.path,
          };
      
            // Save the document and get the document ID
            const document = await this.documentRepository.createDocument(documentData);
            newTask.attachments.push(document._id);
          }
      
          // Call the repository to save the task
          const createdTask = await this.taskRepository.addTask(newTask);
        //   const createdTask = await this.taskRepository.addTask(name, description, dueDate, assignedTo, checkpoints, comments);
      
          res.status(201).json({ task: createdTask });
        } catch (error) {
          console.error('Error while creating task:', error);
          res.status(500).json({ message: 'Error creating task', error: error.message });
        }
      }
      

    async addCheckpoints(req, res) {
        try {
            const { taskId } = req.params;
            const { checkpoints } = req.body;  // Array of checkpoints { description }

            const updatedTask = await this.taskRepository.addCheckpoints(taskId, checkpoints);
            return res.status(200).json({
                status: true,
                task: updatedTask
            });
        } catch (err) {
            console.error('Error while adding checkpoints: ', err);
            return res.status(500).json({ message: 'Error adding checkpoints', error: err.message });
        }
    }

    async updateCheckpointStatus(req, res) {
        try {
            const { taskId, checkpointIndex } = req.params;
            const { completed } = req.body;

            const updatedTask = await this.taskRepository.updateCheckpointStatus(taskId, checkpointIndex, completed);
            return res.status(200).json({
                status: true,
                task: updatedTask
            });
        } catch (err) {
            console.error('Error while updating checkpoint status: ', err);
            return res.status(500).json({ message: 'Error updating checkpoint status', error: err.message });
        }
    }
    
    async addAttachment(req, res) {
        try {
            const { taskId } = req.params;
            const filePath = req.file.path;  // Path to uploaded file

            const updatedTask = await this.taskRepository.addAttachment(taskId, filePath);
            return res.status(200).json({
                status: true,
                task: updatedTask
            });
        } catch (err) {
            console.error('Error while adding attachment: ', err);
            return res.status(500).json({ message: 'Error adding attachment', error: err.message });
        }
    }

    async getTasksAssignedToUser(req, res) {
        try {
            const { userId } = req.params;
            const tasks = await this.taskRepository.getTasksAssignedToUser(userId);
            return res.status(200).json({
                status: true,
                tasks
            });
        } catch (err) {
            console.error('Error while fetching tasks: ', err);
            return res.status(500).json({ message: 'Error fetching tasks', error: err.message });
        }
    }

    async updateTask(req, res) {
        try {
            const { taskId } = req.params;
            const updateData = req.body;
            const updatedTask = await this.taskRepository.updateTask(taskId, updateData);
            return res.status(200).json({
                status: true,
                task: updatedTask
            });
        } catch (err) {
            console.error('Error while updating task: ', err);
            return res.status(500).json({ message: 'Error updating task', error: err.message });
        }
    }

    async deleteTask(req, res) {
        try {
            const { taskId } = req.params;
            const deletedTask = await this.taskRepository.deleteTask(taskId);
            return res.status(200).json({
                status: true,
                message: 'Task deleted successfully',
                task: deletedTask
            });
        } catch (err) {
            console.error('Error while deleting task: ', err);
            return res.status(500).json({ message: 'Error deleting task', error: err.message });
        }
    }

    // TaskController.js
    async updateCheckpoints(req, res) {
        try {
            const { taskId } = req.params;
            const { checkpoints } = req.body;
            
            const updatedTask = await TaskModel.findByIdAndUpdate(
                taskId,
                { $set: { checkpoints } },
                { new: true }
            );
        
            return res.status(200).json({ task: updatedTask });
        } catch (err) {
            console.error('Error while updating checkpoints:', err);
            return res.status(500).json({ message: 'Error updating checkpoints' });
        }
    }
  
}
