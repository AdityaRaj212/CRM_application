import CandidateRepository from './candidate.repository.js';

export default class CandidateController {
    constructor() {
        this.candidateRepository = new CandidateRepository();
    }

    async createCandidate(req, res) {
        try {
            const candidateData = req.body;
            const candidate = await this.candidateRepository.createCandidate(candidateData);
            res.status(201).json({ message: 'Candidate created successfully', candidate });
        } catch (err) {
            res.status(500).json({ message: 'Error creating candidate', error: err.message });
        }
    }

    async getAllCandidates(req, res) {
        try {
            const candidates = await this.candidateRepository.getAllCandidates();
            res.status(200).json(candidates);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching candidates', error: err.message });
        }
    }

    async getCandidateById(req, res) {
        const { candidateId } = req.params;
        try {
            const candidate = await this.candidateRepository.getCandidateById(candidateId);
            if (!candidate) {
                return res.status(404).json({ message: 'Candidate not found' });
            }
            res.status(200).json(candidate);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching candidate', error: err.message });
        }
    }

    async updateCandidate(req, res) {
        const { candidateId } = req.params;
        try {
            const updatedData = req.body;
            const updatedCandidate = await this.candidateRepository.updateCandidateById(candidateId, updatedData);
            res.status(200).json({ message: 'Candidate updated successfully', updatedCandidate });
        } catch (err) {
            res.status(500).json({ message: 'Error updating candidate', error: err.message });
        }
    }

    async deleteCandidate(req, res) {
        const { candidateId } = req.params;
        try {
            await this.candidateRepository.deleteCandidateById(candidateId);
            res.status(200).json({ message: 'Candidate deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting candidate', error: err.message });
        }
    }

    async getCandidateStatistics(req, res) {
        try {
            const statistics = await this.candidateRepository.getCandidateStatistics();
            res.status(200).json(statistics);
        } catch (error) {
            console.error('Error fetching candidate statistics:', error);
            res.status(500).json({ message: 'Error fetching candidate statistics', error: error.message });
        }
    }

    async getCandidateSources(req, res) {
        try {
            const sources = await this.candidateRepository.getCandidateSources();
            res.status(200).json(sources);
        } catch (error) {
        console.log('hit');

            console.error('Error fetching candidate sources:', error);
            res.status(500).json({ message: 'Error fetching candidate sources', error: error.message });
        }
    }

    async getCandidateStatusCounts(req, res) {
        try {
            const result = await this.candidateRepository.getCandidateStatusCounts();
            res.status(200).json(result);
        } catch (error) {
            console.error('Error fetching candidate status counts:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
