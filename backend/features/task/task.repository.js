import { TaskModel } from './task.schema.js';
import mongoose from 'mongoose';

export default class TaskRepository {
    async addTask(task) {
        try {
            const newTask = new TaskModel(
               task
            );
            await newTask.save();
            return newTask;
        } catch (err) {
            console.log('Error while creating task: ', err);
            throw new Error(err);
        }
    }
    // async addTask(name, description, dueDate, assignedTo, checkpoints, comments) {
    //     try {
    //         const newTask = new TaskModel({
    //             name,
    //             description,
    //             assignedTo,
    //             dueDate,
    //             status: 'To-Do',
    //             comments,
    //             checkpoints  // Initialize empty checkpoints array
    //         });
    //         await newTask.save();
    //         return newTask;
    //     } catch (err) {
    //         console.log('Error while creating task: ', err);
    //         throw new Error(err);
    //     }
    // }

    async getTasksAssignedToUser(userId) {
        try {
            const tasks = await TaskModel.find({ assignedTo: userId });
            return tasks;
        } catch (err) {
            console.log('Error while fetching tasks: ', err);
            throw new Error('Error fetching tasks');
        }
    }

    // Add checkpoints to a task
    async addCheckpoints(taskId, checkpoints) {
        try {
            const task = await TaskModel.findById(taskId);
            if (!task) throw new Error('Task not found');

            task.checkpoints.push(...checkpoints);  // Add new checkpoints
            await task.save();
            return task;
        } catch (err) {
            console.log('Error while adding checkpoints: ', err);
            throw new Error(err);
        }
    }

    // Update checkpoint completion status
    async updateCheckpoints(taskId, checkpoints) {
        try {
            const task = await TaskModel.findById(taskId);
            if (!task) throw new Error('Task not found');
    
            // Update the task's checkpoints with the new array
            task.checkpoints = checkpoints;
    
            // Save the updated task
            await task.save();
            
            return task;
        } catch (err) {
            console.log('Error while updating checkpoints: ', err);
            throw new Error(err);
        }
    }
    

    // Update task to add file attachments
    async addAttachment(taskId, filePath) {
        try {
            const task = await TaskModel.findById(taskId);
            if (!task) throw new Error('Task not found');

            task.attachments.push(filePath);  // Add file path to attachments array
            await task.save();
            return task;
        } catch (err) {
            console.log('Error while adding attachment: ', err);
            throw new Error(err);
        }
    }

    async updateTask(taskId, updateData) {
        try {
            const updatedTask = await TaskModel.findByIdAndUpdate(
                taskId,
                { $set: updateData },
                { new: true }
            );

            if (!updatedTask) {
                throw new Error(`Task with ID ${taskId} not found`);
            }

            return updatedTask;
        } catch (err) {
            console.log('Error while updating task: ', err);
            throw new Error(err);
        }
    }

    async deleteTask(taskId) {
        try {
            const deletedTask = await TaskModel.findByIdAndDelete(taskId);

            if (!deletedTask) {
                throw new Error(`Task with ID ${taskId} not found`);
            }

            return deletedTask;
        } catch (err) {
            console.log('Error while deleting task: ', err);
            throw new Error(err);
        }
    }
}
