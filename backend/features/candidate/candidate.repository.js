import { CandidateModel } from './candidate.schema.js';

export default class CandidateRepository {
    async createCandidate(candidateData) {
        const candidate = new CandidateModel(candidateData);
        return await candidate.save();
    }

    async getAllCandidates() {
        return await CandidateModel.find();
    }

    async getCandidateById(candidateId) {
        return await CandidateModel.findById(candidateId);
    }

    async updateCandidateById(candidateId, updateData) {
        return await CandidateModel.findByIdAndUpdate(candidateId, updateData, { new: true });
    }

    async deleteCandidateById(candidateId) {
        return await CandidateModel.findByIdAndDelete(candidateId);
    }

    async getCandidateStatistics() {
        // Group by appliedDate and calculate receivedResponses and candidatesHired
        return await CandidateModel.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$appliedDate" } },
                    receivedResponses: { $sum: 1 },
                    candidatesHired: {
                        $sum: { $cond: [{ $eq: ["$status", "Hired"] }, 1, 0] }
                    }
                }
            },
            {
                $project: {
                    date: "$_id",
                    receivedResponses: 1,
                    candidatesHired: 1,
                    _id: 0 // Exclude _id field
                }
            },
            { $sort: { date: 1 } } // Sort by date
        ]);
    }

    async getCandidateSources() {
        // console.log('hit');
        return await CandidateModel.aggregate([
            {
                $group: {
                    _id: "$source", // Group by the source field
                    count: { $sum: 1 } // Count the number of candidates from each source
                }
            },
            {
                $project: {
                    name: "$_id", // Rename _id to name
                    count: 1,
                    _id: 0 // Exclude _id field from the result
                }
            }
        ]);
    }

    async getCandidateStatusCounts() {
        const candidates = await this.getAllCandidates();

        const totalCandidates = candidates.length;

        // Initialize counts
        const statusCounts = {
            Applied: 0,
            Interviewed: 0,
            Hired: 0,
            Rejected: 0,
        };

        // Count candidates by status
        candidates.forEach(candidate => {
            statusCounts[candidate.status]++;
        });

        // Calculate percentages
        const statusPercentages = {
            Applied: totalCandidates ? ((statusCounts.Applied / totalCandidates) * 100).toFixed(2) : 0,
            Interviewed: totalCandidates ? ((statusCounts.Interviewed / totalCandidates) * 100).toFixed(2) : 0,
            Hired: totalCandidates ? ((statusCounts.Hired / totalCandidates) * 100).toFixed(2) : 0,
            Rejected: totalCandidates ? ((statusCounts.Rejected / totalCandidates) * 100).toFixed(2) : 0,
        };

        return {
            statusCounts,
            statusPercentages,
            totalCandidates,
        };
    }
}
