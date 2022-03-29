const  multer=require('multer');

const  multerConfig=()=>{
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/images/profile/')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + '.jpg')
        }
    });
    const upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" ||file.mimetype == "image/jpg") {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error('Only .png and .jpg format allowed!'));
            }
        }
    });
    return upload;
}

module.exports = multerConfig;