import DashboardModel from './dashboard.schema.js';

export default class DashboardRepository {
    async getDashboardData() {
        return await DashboardModel.findOne(); // Assuming one document holds this info
    }

    async updateDashboard(data) {
        return await DashboardModel.findOneAndUpdate({}, data, { new: true, upsert: true });
    }
}
