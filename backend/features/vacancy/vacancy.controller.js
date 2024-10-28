import { UserModel } from '../user/user.schema.js';
import VacancyRepository from './vacancy.repository.js';

export default class VacancyController {
    constructor() {
        this.vacancyRepository = new VacancyRepository();
    }

    async createVacancy(req, res) {
        try {
            const vacancyData = { ...req.body, creationDate: Date.now(), status: 'open', applicants: [], hired: [] };
            // const vacancyData = { ...req.body, createdBy: req.user.userId };
            const vacancy = await this.vacancyRepository.createVacancy(vacancyData);
            res.status(201).json({ message: 'Vacancy created successfully', vacancy });
        } catch (error) {
            console.error('Error creating vacancy:', error);
            res.status(500).json({ message: 'Error creating vacancy', error: error.message });
        }
    }

    async getAllVacancies(req, res) {
        try {
            const vacancies = await this.vacancyRepository.getAllVacancies();
            res.status(200).json(vacancies);
        } catch (error) {
            console.error('Error fetching vacancies:', error);
            res.status(500).json({ message: 'Error fetching vacancies', error: error.message });
        }
    }

    async getVacancyById(req, res) {
        const { vacancyId } = req.params;
        try {
            const vacancy = await this.vacancyRepository.getVacancyById(vacancyId);
            if (!vacancy) {
                return res.status(404).json({ message: 'Vacancy not found' });
            }
            res.status(200).json(vacancy);
        } catch (error) {
            console.error('Error fetching vacancy:', error);
            res.status(500).json({ message: 'Error fetching vacancy', error: error.message });
        }
    }

    async updateVacancy(req, res) {
        const { vacancyId } = req.params;
        try {
            const updatedVacancy = await this.vacancyRepository.updateVacancy(vacancyId, req.body);
            if (!updatedVacancy) {
                return res.status(404).json({ message: 'Vacancy not found' });
            }
            res.status(200).json({ message: 'Vacancy updated successfully', updatedVacancy });
        } catch (error) {
            console.error('Error updating vacancy:', error);
            res.status(500).json({ message: 'Error updating vacancy', error: error.message });
        }
    }

    async deleteVacancy(req, res) {
        const { vacancyId } = req.params;
        try {
            await this.vacancyRepository.deleteVacancy(vacancyId);
            res.status(200).json({ message: 'Vacancy deleted successfully' });
        } catch (error) {
            console.error('Error deleting vacancy:', error);
            res.status(500).json({ message: 'Error deleting vacancy', error: error.message });
        }
    }

    // New methods for metrics
    async getOpenVacanciesCount(req, res) {
        try {
            const count = await this.vacancyRepository.countOpenVacancies();
            res.status(200).json({ openVacancies: count });
        } catch (error) {
            console.error('Error fetching open vacancies count:', error);
            res.status(500).json({ message: 'Error fetching open vacancies count', error: error.message });
        }
    }

    async getTotalApplicationsCount(req, res) {
        try {
            const count = await this.vacancyRepository.countTotalApplications();
            res.status(200).json({ totalApplications: count });
        } catch (error) {
            console.error('Error fetching total applications count:', error);
            res.status(500).json({ message: 'Error fetching total applications count', error: error.message });
        }
    }

    async getHiredEmployeesCount(req, res) {
        try {
            const count = await this.vacancyRepository.countHiredEmployees();
            res.status(200).json({ hiredEmployees: count });
        } catch (error) {
            console.error('Error fetching hired employees count:', error);
            res.status(500).json({ message: 'Error fetching hired employees count', error: error.message });
        }
    }

    async getVacanciesByUserId(req, res) {
        const { userId } = req.params; // Get the userId from the request parameters
        try {
            const vacancies = await this.vacancyRepository.getVacanciesByUserId(userId);
            if (!vacancies.length) {
                console.log('idhar');
                return res.status(404).json({ message: 'No vacancies found for this user.' });
            }
            res.status(200).json(vacancies);
        } catch (error) {
            console.error('Error fetching vacancies by user ID:', error);
            res.status(500).json({ message: 'Error fetching vacancies', error: error.message });
        }
    }

    async getAverageClosingTime(req, res) {
        try {
            const averageClosingTimes = await this.vacancyRepository.getAverageClosingTimeByRecruiter();
            const recruitersWithInfo = await Promise.all(
                averageClosingTimes.map(async (vacancy) => {
                    const recruiter = await UserModel.findById(vacancy._id);
                    return {
                        recruiterId: vacancy._id,
                        recruiterInfo: recruiter,
                        averageClosingTime: vacancy.averageClosingTime/(3600*24*1000)
                    };
                })
            );

            res.status(200).json(recruitersWithInfo);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
