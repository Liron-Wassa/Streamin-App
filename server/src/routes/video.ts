import { createVideo, getAll, getOne, removeOne, updateOne } from '../controllers/video';
import { checkUserAdmin, checkUserLogin } from '../middlewares/auth';
import { videoValidation } from '../middlewares/validation';
import multer, { Multer, StorageEngine } from 'multer';
import { Router, Request } from 'express';
import path from 'path';

const router: Router = Router();

const storage: StorageEngine = multer.diskStorage({    
    // destination(req: Request, file: Express.Multer.File, callBack: any) {
    //     callBack(null, 'src/videos/');
    // },
    filename(req, file, callBack) {
        const uniqueFileName: string = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        callBack(null, uniqueFileName);
    }
});

const checkFileType = (req: Request, file: Express.Multer.File, callBack: any) => {
    const fileTypes: RegExp = /mp2|mp4|mov|wmv|webm|mpg|mpeg|mpe|mpv|ogg|m4p|m4v|avi|qt|flv|swf|avchd/;

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

const upload: Multer = multer({storage, fileFilter: checkFileType});

router.get('/', getAll);
router.get('/contents', checkUserLogin, checkUserAdmin, getAll);
router.get('/:videoId', checkUserLogin, checkUserAdmin, getOne);
router.post('/', checkUserLogin, checkUserAdmin, upload.single('video'), createVideo);
router.patch('/:videoId', checkUserLogin, checkUserAdmin, videoValidation, updateOne);
router.delete('/:videoId', checkUserLogin, checkUserAdmin, removeOne);

export = router;
