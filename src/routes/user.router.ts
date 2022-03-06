import { Router } from 'express';
import { getByIdOrToken, signUp } from '../controllers/user.controller';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getByIdOrToken);
router.post('/signup', signUp);

router.use(authMiddleware);
export default router;
