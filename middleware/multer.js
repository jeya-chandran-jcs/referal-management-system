const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require("../config/cloudinary")
 
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'pdf-uploads',       
        format: async (req, file) => 'pdf',
        resource_type: 'raw',      
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = { upload };  