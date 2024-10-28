import { VacancyModel } from './vacancy.schema.js';
import mongoose from 'mongoose';

export default class VacancyRepository {
    async createVacancy(vacancyData) {
        const vacancy = new VacancyModel(vacancyData);
        return await vacancy.save();
    }

    async getAllVacancies() {
        return await VacancyModel.find().populate('createdBy', 'firstName lastName').populate('hired', 'firstName lastName').populate('applicants');
    }

    async getVacancyById(vacancyId) {
        return await VacancyModel.findById(vacancyId).populate('createdBy', 'firstName lastName').populate('hired', 'firstName lastName').populate('applicants');
    }

    async updateVacancy(vacancyId, updateData) {
        return await VacancyModel.findByIdAndUpdate(vacancyId, updateData, { new: true });
    }

    async deleteVacancy(vacancyId) {
        return await VacancyModel.findByIdAndDelete(vacancyId);
    }

    // New methods for metrics
    async countOpenVacancies() {
        return await VacancyModel.countDocuments({ status: 'open' });
    }

    async countTotalApplications() {
        const vacancies = await this.getAllVacancies();
        return vacancies.reduce((total, vacancy) => total + vacancy.applicants.length, 0);
    }

    async countHiredEmployees() {
        const vacancies = await this.getAllVacancies();
        return vacancies.reduce((total, vacancy) => total + vacancy.hired.length, 0);
    }

    async getVacanciesByUserId(userId) {
        const objectId = new mongoose.Types.ObjectId(userId);
        
        return await VacancyModel.find({ createdBy: objectId })
            .populate('createdBy', 'firstName lastName')
            .populate('hired', 'firstName lastName')
            .populate('applicants');
    }

    // async getVacanciesByUserId(userId) {
    //     return await VacancyModel.find({ createdBy: userId })
    //         .populate('createdBy', 'firstName lastName')
    //         .populate('hired', 'firstName lastName')
    //         .populate('applicants');
    // }
}
