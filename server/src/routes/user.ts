import { login } from '../controllers/user';
import { Router } from 'express';

const router: Router = Router();

router.post('/login', login);

export = router;