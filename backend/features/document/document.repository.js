import { documentModel } from './document.schema.js';

export default class DocumentRepository {
    async createDocument(documentData) {
        const document = new documentModel(documentData);
        return await document.save();
    }

    async getAllDocuments() {
        return await documentModel.find().populate('userId', 'firstName lastName');
    }

    async getDocumentById(documentId) {
        return await documentModel.findById(documentId);
    }

    async deleteDocumentById(documentId) {
        return await documentModel.findByIdAndDelete(documentId);
    }

    async updateDocumentById(documentId, updateData) {
        return await documentModel.findByIdAndUpdate(documentId, updateData, { new: true });
    }
}
