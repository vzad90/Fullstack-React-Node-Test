import { PrismaClient, Status } from '@prisma/client';
import {IUpdateTask, IUpdateUser} from "../interfaces";

const prisma = new PrismaClient();

export function createUserInDb(name: string, email: string, password: string) {
    return prisma.user.create({
        data: {
            name,
            email,
            password,
        }
    });
}

export function getAllUsersFromDb() {
    return prisma.user.findMany();
}

export function getUserByIdFromDb(user_id: number) {
    return prisma.user.findUnique({
        where: {
            id: user_id
        }
    });
}

export function updateUserInDb({
                                   id,
                                   name,
                                    email,
                                    password
                               }: IUpdateUser) {

    return prisma.user.update({
        where: {
            id,
        },
        data: {
            ...(name && { name }),
            ...(email && { email }),
            ...(password && { password })
        }
    });
}

export function deleteUserFromDb(id: number) {
    return prisma.user.delete({
        where: {
            id
        }
    });
}
