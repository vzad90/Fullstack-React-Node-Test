import { Router } from 'express';
import {createTask, deleteTask, getTask, getTaskByUserId, getTasks, updateTask} from "../controllers/task.controller";

const taskRouter = Router();

taskRouter.post('/create', async (req, res) => {
    const {title, description} = req.body;
    const userId = req.user?.userId || -1;

    const result = await createTask(description, title, userId);
    res.send(result);
});

taskRouter.get('/', async (req, res) => {

    const result = await getTasks();
    res.send(result);
});

taskRouter.get('/user', async (req, res) => {
    const user_id = req.user?.userId;
    const result = await getTaskByUserId(Number(user_id));
    res.send(result);
});


taskRouter.get('/:task_id', async (req, res) => {
    const {task_id} = req.params;
    const result = await getTask(Number(task_id));
    res.send(result);
});


taskRouter.put('/:task_id', async (req, res) => {
    const {task_id} = req.params;
    const {description, title, status} = req.body;
    const userId = req.user?.userId || -1;
    const result = await updateTask({description, title, id: Number(task_id), status, userId});
    res.send(result);
})

taskRouter.delete('/:task_id', async (req, res) => {
    const {task_id} = req.params;
    const result = await deleteTask(Number(task_id));
    res.send(result);
});

export default taskRouter;
