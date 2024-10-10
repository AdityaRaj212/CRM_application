import DocumentRepository from './document.repository.js';

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
                description: req.body.description || currentDocument.description,
                // You can add logic to handle the file if provided
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
            
            const filePath = path.resolve(document.filePath); // Resolve the full path to the file
            res.sendFile(filePath); // Send the file for preview
        } catch (err) {
            res.status(500).json({ message: 'Error previewing document', error: err.message });
        }
    }

    // Method for downloading a document
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
