import {Status} from "@prisma/client";

export interface IUpdateTask {
    description?: string,
    title?: string,
    id: number,
    status?: Status,
    userId: number
}

export interface IUpdateUser {
    name?: string,
    email?: string,
    password?: string,
    id: number,
}