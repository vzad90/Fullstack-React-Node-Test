import { Router } from 'express';
import {createTask, deleteTask, getTask, getTasks, updateTask} from "../controllers/task.controller";
import {createUser, deleteUser, getUserById, getUsers, loginUser, updateUser} from "../controllers/user.controller";
import {protect} from "../middleware/auth";

const userRouter = Router();

userRouter.post('/create', async (req, res) => {
    const {name, email, password} = req.body;

    const result = await createUser(name, email, password);
    res.send(result);
});

userRouter.get('/', protect, async (req, res) => {
    const result = await getUsers();
    res.send(result);
});

userRouter.get('/get-user-data', protect, async (req, res) => {
    const userId = req.user?.userId || -1;
    const result = await getUserById(userId);
    res.send(result);
});

userRouter.put('/:user_id', protect, async (req, res) => {
    const {user_id} = req.params;
    const {name, email, password} = req.body;
    const result = await updateUser({name, email, password, id: Number(user_id)});
    res.send(result);
})

userRouter.delete('/:user_id', protect, async (req, res) => {
    const {user_id} = req.params;
    const result = await deleteUser(Number(user_id));
    res.send(result);
});

export default userRouter;
