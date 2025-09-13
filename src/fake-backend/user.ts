import { createId } from '@paralleldrive/cuid2';
import { userDb } from '../db/user';
import bcrypt from "bcryptjs";

export const userService = {
    register,
}

export interface RegisterUser {
    name: string;
    username: string;
    password: string;
}

export interface User extends RegisterUser {
    id: string;
}

async function register(registerUser: RegisterUser) {
    const existingUser = await userDb.getUser(registerUser.username);
    if (existingUser) return false;

    // TODO: The current implemtation of the password hashing is probably not secure enough, the string can still exist in memory
    // TODO: error handling
    // NOTE: I peronally for real projects would use argon2 instead of bcrypt, at the time of writing it is the best choice for password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(registerUser.password, salt);
    const user: User = { ...registerUser, id: createId(), password: hashedPassword };
    userDb.addUser(user);
    return user;
}