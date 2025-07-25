import { Router } from 'express';
import {createTask, deleteTask, getTask, getTasks, updateTask} from "../controllers/task.controller";
import {createUser, deleteUser, getUser, getUsers, updateUser} from "../controllers/user.controller";

const userRouter = Router();

userRouter.post('/create', async (req, res) => {
    const {name, email, password} = req.body;

    const result = await createUser(name, email, password);
    res.send(result);
});

userRouter.get('/', async (req, res) => {

    const result = await getUsers();
    res.send(result);
});

userRouter.get('/:user_id', async (req, res) => {
    const {user_id} = req.params;
    const result = await getUser(Number(user_id));
    res.send(result);
});

userRouter.put('/:user_id', async (req, res) => {
    const {user_id} = req.params;
    const {name, email, password} = req.body;
    const result = await updateUser({name, email, password, id: Number(user_id)});
    res.send(result);
})

userRouter.delete('/:user_id', async (req, res) => {
    const {user_id} = req.params;
    const result = await deleteUser(Number(user_id));
    res.send(result);
});

export default userRouter;
