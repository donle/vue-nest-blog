import * as multer from 'multer';
import { Validator } from 'class-validator';
import { FileInterceptor } from '@nestjs/common';

const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, '/upload/resources'),
    filename: (req, file, callback) => callback(null, file.filename)
});

const fileFilter = (req, file, callback) => {
    const filename = file.filename.split('.');
    const ext = filename[filename.length - 1];
    if (!['jpg', 'jpeg', 'bmp', 'png'].includes(ext))
    callback(null, true);
}

const multerOptions = {
    storage,
    fileFilter,
    limits: {
        files: 1
    }
};

export const ImageInterceptor = FileInterceptor('image', multerOptions);