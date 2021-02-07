import { createVideo, getAll, getOne, removeOne, updateOne } from '../controllers/video';
import { videoValidation } from '../middlewares/validation';
import multer, { Multer, StorageEngine } from 'multer';
import { Router, Request } from 'express';
import path from 'path';

const router: Router = Router();

const storage: StorageEngine = multer.diskStorage({    
    destination(req: Request, file: Express.Multer.File, callBack: any) {
        callBack(null, 'src/videos/');
    },
    filename(req, file, callBack) {
        const uniqueFileName: string = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        callBack(null, uniqueFileName);
    }
});

const checkFileType = (file: Express.Multer.File, callBack: any) => {
    const fileTypes: RegExp = /mp4|mov|wmv/;

    const extensionName: string = path.extname(file.originalname).toLowerCase();

    const isVideoType: boolean = fileTypes.test(extensionName);
    const isVideoMimeType: boolean = fileTypes.test(file.mimetype);

    if(isVideoType && isVideoMimeType) {
        callBack(null, true);
    }
    else {        
        callBack('Only videos');
    };
};

const upload: Multer = multer({
    storage,
    fileFilter: (req: Request, file: Express.Multer.File, callBack: any) => {  
        checkFileType(file, callBack);
    }
});

router.get('/', getAll);
router.get('/:videoId', getOne);
router.post('/', upload.single('video'), createVideo);
router.patch('/:videoId', videoValidation, updateOne);
router.delete('/:videoId', removeOne);

export = router;
