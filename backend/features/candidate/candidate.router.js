import express from 'express';
import CandidateController from './candidate.controller.js';

const router = express.Router();
const candidateController = new CandidateController();

router.post('/', (req, res) => candidateController.createCandidate(req, res));

router.get('/', (req, res) => candidateController.getAllCandidates(req, res));

router.get('/sources', (req, res) => candidateController.getCandidateSources(req, res));

router.get('/statistics', (req, res) => candidateController.getCandidateStatistics(req, res));

router.get('/status-counts', (req, res) => candidateController.getCandidateStatusCounts(req, res));

router.get('/:candidateId', (req, res) => candidateController.getCandidateById(req, res));

router.put('/:candidateId', (req, res) => candidateController.updateCandidate(req, res));

router.delete('/:candidateId', (req, res) => candidateController.deleteCandidate(req, res));



export default router;
