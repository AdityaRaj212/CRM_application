import express from 'express';
import VacancyController from './vacancy.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const vacancyRouter = express.Router();
const vacancyController = new VacancyController();

// Route for creating a vacancy
vacancyRouter.post('/', (req, res) => vacancyController.createVacancy(req, res));

// Route for fetching all vacancies
vacancyRouter.get('/', (req, res) => vacancyController.getAllVacancies(req, res));

vacancyRouter.get('/average-closing-time', (req, res) => vacancyController.getAverageClosingTime(req, res));

// Route for fetching a vacancy by ID
vacancyRouter.get('/:vacancyId', (req, res) => vacancyController.getVacancyById(req, res));

// Route for updating a vacancy
vacancyRouter.put('/:vacancyId', authMiddleware, (req, res) => vacancyController.updateVacancy(req, res));

// Route for deleting a vacancy
vacancyRouter.delete('/:vacancyId', authMiddleware, (req, res) => vacancyController.deleteVacancy(req, res));

// New routes for metrics
vacancyRouter.get('/count/open', (req, res) => vacancyController.getOpenVacanciesCount(req, res));
vacancyRouter.get('/count/applications', (req, res) => vacancyController.getTotalApplicationsCount(req, res));
vacancyRouter.get('/count/hired', (req, res) => vacancyController.getHiredEmployeesCount(req, res));
vacancyRouter.get('/user/:userId', (req, res) => vacancyController.getVacanciesByUserId(req, res));


export default vacancyRouter;
