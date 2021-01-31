import { createVideo, findAll, removeOne, updateOne } from '../controllers/video';
import { Router } from 'express';

const router: Router = Router();

router.get('/', createVideo);
router.post('/', findAll);
router.patch('/:videoId', updateOne);
router.delete('/:videoId', removeOne);

export = router;
