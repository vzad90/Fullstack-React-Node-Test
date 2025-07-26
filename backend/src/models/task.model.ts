import { PrismaClient, Status } from '@prisma/client';
import {IUpdateTask} from "../interfaces";

const prisma = new PrismaClient();

export function createTaskInDb(description: string, title: string, userId: number, status: Status = Status.IN_PROGRESS) {
    return prisma.task.create({
        data: {
            description,
            title,
            status,
            userId
        }
    });
}

export function getAllTasksFromDb() {
    return prisma.task.findMany();
}

export function getTaskByIdFromDb(task_id: number) {
    return prisma.task.findUnique({
        where: {
            id: task_id
        }
    });
}

export function getTaskByUserIdFromDb(user_id: number) {
    return prisma.task.findMany({
        where: {
            userId: user_id
        },
        orderBy: {
            id: 'desc'
        }
    });
}

export function updateTaskInDb({
                                   id,
                                   description,
                                   title,
                                   status,
                                    userId
                               }: IUpdateTask) {
    console.log(userId, id)
    return prisma.task.update({
        where: {
            id,
            userId
        },
        data: {
            ...(description && { description }),
            ...(title && { title }),
            ...(status && { status })
        }
    });
}

export function deleteTaskFromDb(id: number) {
    return prisma.task.delete({
        where: {
            id
        }
    });
}
