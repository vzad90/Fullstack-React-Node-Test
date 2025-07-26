import { Router } from 'express';
import taskRouter from './task.route';
import userRouter from "./user.route";
import {protect} from "../middleware/auth";
import authRouter from "./auth.route";
const router = Router();

router.get('/', (req, res) => {
    res.send('Hello from Express + TypeScript!');
});


router.use('/tasks', protect, taskRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
