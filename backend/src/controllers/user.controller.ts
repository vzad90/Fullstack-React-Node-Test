import prisma from "../client";
import {
    createTaskInDb,
    deleteTaskFromDb,
    getAllTasksFromDb,
    getTaskByIdFromDb,
    updateTaskInDb
} from "../models/task.model";
import {Status} from "@prisma/client";
import {IUpdateTask, IUpdateUser} from "../interfaces";
import {
    createUserInDb,
    deleteUserFromDb,
    getAllUsersFromDb,
    getUserByIdFromDb,
    updateUserInDb
} from "../models/user.model";

export  function createUser(name: string, email: string, password: string) {


    return createUserInDb(name, email, password);
}

export async function getUsers() {
    return getAllUsersFromDb();
}

export function getUser(user_id: number) {
    return getUserByIdFromDb(user_id)
}

export function updateUser({name, email, password, id}: IUpdateUser) {
    return updateUserInDb({name, email, password, id})
}

export function deleteUser(id: number) {
    return deleteUserFromDb(id)
}