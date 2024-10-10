import express from 'express';
import { upload } from '../../middlewares/fileUpload.middleware.js';
import DocumentController from './document.controller.js';

const router = express.Router();
const documentController = new DocumentController();

// Route for uploading documents
router.post('/upload', upload.single('file'), (req, res) => documentController.uploadDocument(req, res));

// Route for fetching all documents
router.get('/', (req, res) => documentController.getDocuments(req, res));

// Route for deleting a document
router.delete('/:documentId', (req, res) => documentController.deleteDocument(req, res));

// Route for updating a document
router.put('/:documentId', upload.single('file'), (req, res) => documentController.updateDocument(req, res));

// Route for previewing a document
router.get('/preview/:documentId', (req, res) => documentController.previewDocument(req, res));

// Route for downloading a document
router.get('/download/:documentId', (req, res) => documentController.downloadDocument(req, res));

export default router;
