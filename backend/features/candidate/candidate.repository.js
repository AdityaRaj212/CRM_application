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
}
