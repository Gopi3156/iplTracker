import express from 'express';
import { register, login, setupFirstAdmin } from '../controllers/user.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/setup-admin', setupFirstAdmin);

export default router; 