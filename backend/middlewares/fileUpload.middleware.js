import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(path.resolve(), 'public', 'uploads');

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

console.log('Files will be uploaded to:', uploadDir);

const storage_config = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const name = `${Date.now()}-${file.originalname}`;
        // const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

export const upload = multer({
    storage: storage_config,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|pdf|docx/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            cb(null, true);
        } else {
            cb(new Error('File type not supported!'));
        }
    }
});