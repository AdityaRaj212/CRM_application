import mongoose from 'mongoose';

const DashboardSchema = new mongoose.Schema({
    totalResponses: { type: Number, required: true },
    responsesToday: { type: Number, required: true },
    totalVacancies: { type: Number, required: true },
    closedVacancies: { type: Number, required: true },
    recruitmentPlan: { type: Number, required: true },
}, { timestamps: true });

const DashboardModel = mongoose.model('Dashboard', DashboardSchema);
export default DashboardModel;
