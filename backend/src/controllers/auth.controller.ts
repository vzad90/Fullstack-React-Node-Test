import {getUserByEmailFromDb} from "../models/user.model";
import bcrypt from "bcryptjs";
import {generateToken} from "../utils/jwt";

export async function loginUser(user_email: string, user_password: string) {
    const user = await getUserByEmailFromDb(user_email)

    if (!user) {
        throw new Error('User not found');
    }

    const valid = bcrypt.compare(user_password, user.password);

    if (!valid) {
        throw new Error('Invalid password');   
    }

    const token = generateToken({userId: user.id})

    return {token}
}