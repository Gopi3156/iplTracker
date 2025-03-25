import express from 'express';
import { getAllUsers, setAdminStatus } from '../controllers/admin.controller';
import { isAdmin } from '../middleware/adminAuth';

const router = express.Router();

router.get('/users', isAdmin, getAllUsers);
router.put('/users/:id/admin-status', isAdmin, setAdminStatus);

export default router; 