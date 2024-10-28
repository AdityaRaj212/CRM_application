import DashboardRepository from './dashboard.repository.js';

export default class DashboardController {
    constructor() {
        this.dashboardRepository = new DashboardRepository();
    }

    async getDashboardData(req, res) {
        try {
            const dashboardData = await this.dashboardRepository.getDashboardData();
            res.status(200).json(dashboardData);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
        }
    }

    async updateDashboard(req, res) {
        try {
            const data = req.body; // Assuming the body contains the data to update
            const updatedData = await this.dashboardRepository.updateDashboard(data);
            res.status(200).json(updatedData);
        } catch (error) {
            res.status(500).json({ message: 'Error updating dashboard data', error: error.message });
        }
    }
}
