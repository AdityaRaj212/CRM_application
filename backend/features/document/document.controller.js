import DocumentRepository from './document.repository.js';
import path from 'path';
import fs from 'fs';

export default class DocumentController {
    constructor() {
        this.documentRepository = new DocumentRepository();
    }

    async uploadDocument(req, res) {
        try {
            const documentData = {
                userId: req.body.userId, // Assuming user is authenticated and user ID is available
                filename: req.file.originalname,
                filePath: req.file.path,
                fileType: req.body.fileType,
                description: req.body.description // Include description
            };

            const document = await this.documentRepository.createDocument(documentData);
            res.status(201).json({ message: 'File uploaded successfully', document });
        } catch (err) {
            res.status(500).json({ message: 'File upload failed', error: err.message });
        }
    }

    async getDocuments(req, res) {
        try {
            const documents = await this.documentRepository.getAllDocuments();
            res.status(200).json(documents);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching documents', error: err.message });
        }
    }

    async deleteDocument(req, res) {
        const { documentId } = req.params;
        try {
            await this.documentRepository.deleteDocumentById(documentId);
            res.status(200).json({ message: 'Document deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting document', error: err.message });
        }
    }

    async updateDocument(req, res) {
        const { documentId } = req.params;
        try {
            const updatedData = {
                filename: req.body.filename || currentDocument.filename,
                fileType: req.body.fileType || currentDocument.fileType,
                description: req.body.description || currentDocument.description,
            };

            if (req.file) {
                updatedData.filePath = req.file.path; // Update file path if a new file is uploaded
            }

            const updatedDocument = await this.documentRepository.updateDocumentById(documentId, updatedData);
            res.status(200).json({ message: 'Document updated successfully', updatedDocument });
        } catch (err) {
            res.status(500).json({ message: 'Error updating document', error: err.message });
        }
    }

    async previewDocument(req, res) {
        const { documentId } = req.params;
        try {
            const document = await this.documentRepository.getDocumentById(documentId);
            if (!document) {
                return res.status(404).json({ message: 'Document not found' });
            }

            const normalizedPath = path.normalize(document.filePath); // Normalize the path
            const filePath = path.resolve(normalizedPath); // Resolve the full path to the file

            // Check if the file exists
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: 'File does not exist' });
            }

            // Set the Content-Type to application/pdf for PDF files
            if (document.fileType === 'application/pdf') {
                res.setHeader('Content-Type', 'application/pdf');
            } else {
                // Handle other file types accordingly
                res.setHeader('Content-Type', document.fileType); 
            }

            // Send the file for preview
            res.sendFile(filePath, (err) => {
                if (err) {
                    res.status(err.status).end();
                }
            });
        } catch (err) {
            res.status(500).json({ message: 'Error previewing document', error: err.message });
        }
    }

    // Method to determine the content type based on file type
    getContentType(fileType) {
        switch (fileType) {
            case 'application/pdf':
                return 'application/pdf';
            case 'image/jpeg':
                return 'image/jpeg';
            case 'image/png':
                return 'image/png';
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
            default:
                return 'application/octet-stream'; // Fallback for unknown types
        }
    }

    async downloadDocument(req, res) {
        const { documentId } = req.params;
        try {
            const document = await this.documentRepository.getDocumentById(documentId);
            if (!document) {
                return res.status(404).json({ message: 'Document not found' });
            }

            const filePath = path.resolve(document.filePath); // Resolve the full path to the file
            res.download(filePath, document.filename); // Send the file as an attachment for download
        } catch (err) {
            res.status(500).json({ message: 'Error downloading document', error: err.message });
        }
    } 
}
