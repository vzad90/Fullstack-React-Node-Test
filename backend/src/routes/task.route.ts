import { Router } from 'express';
import {createTask, deleteTask, getTask, getTasks, updateTask} from "../controllers/task.controller";

const taskRouter = Router();

taskRouter.post('/create', async (req, res) => {
    const {title, description, userId} = req.body;

    const result = await createTask(title, description, userId);
    res.send(result);
});

taskRouter.get('/', async (req, res) => {

    const result = await getTasks();
    res.send(result);
});

taskRouter.get('/:task_id', async (req, res) => {
    const {task_id} = req.params;
    const result = await getTask(Number(task_id));
    res.send(result);
});

taskRouter.put('/:task_id', async (req, res) => {
    const {task_id} = req.params;
    const {description, title, status, userId} = req.body;
    const result = await updateTask({description, title, id: Number(task_id), status, userId});
    res.send(result);
})

taskRouter.delete('/:task_id', async (req, res) => {
    const {task_id} = req.params;
    const result = await deleteTask(Number(task_id));
    res.send(result);
});

export default taskRouter;
