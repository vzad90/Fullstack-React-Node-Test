import bcrypt from 'bcryptjs';
import {IUpdateUser} from "../interfaces";
import {
    createUserInDb,
    deleteUserFromDb,
    getAllUsersFromDb, getUserByEmailFromDb,
    getUserByIdFromDb,
    updateUserInDb
} from "../models/user.model";
import {generateToken} from "../utils/jwt";


export async function createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUserInDb(name, email, hashedPassword);

    const token = generateToken({userId: user.id})

    return {token}
}

export async function getUsers() {
    return getAllUsersFromDb();
}

export function getUserById(user_id: number) {
    return getUserByIdFromDb(user_id)
}

export async function loginUser(user_email: string, user_password: string) {
    const user = await getUserByEmailFromDb(user_email)

    if (!user) {
        throw new Error('User not found');
    }

    const valid = bcrypt.compare(user_password, user.password);

    const token = generateToken({userId: user.id})

    return {token}


}

export function updateUser({name, email, password, id}: IUpdateUser) {
    return updateUserInDb({name, email, password, id})
}

export function deleteUser(id: number) {
    return deleteUserFromDb(id)
}