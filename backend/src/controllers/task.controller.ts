import prisma from "../client";
import {
    createTaskInDb,
    deleteTaskFromDb,
    getAllTasksFromDb,
    getTaskByIdFromDb,
    updateTaskInDb
} from "../models/task.model";
import {Status} from "@prisma/client";
import {IUpdateTask} from "../interfaces";

export  function createTask(description: string, title: string, userId: number) {
    console.log(description, title);

    return createTaskInDb(description, title, userId);
}

export async function getTasks() {
    return getAllTasksFromDb();
}

export function getTask(task_id: number) {
    return getTaskByIdFromDb(task_id)
}

export function updateTask({description, title, id, status, userId}: IUpdateTask) {
    return updateTaskInDb({description, title, id, status, userId})
}

export function deleteTask(id: number) {
    return deleteTaskFromDb(id)
}