import { Router } from 'express';
import taskRouter from './task.route';
import userRouter from "./user.route";
const router = Router();

router.get('/', (req, res) => {
    res.send('Hello from Express + TypeScript!');
});

router.use('/tasks', taskRouter);
router.use('/users', userRouter);

export default router;
