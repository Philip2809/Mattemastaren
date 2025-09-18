import { createId } from '@paralleldrive/cuid2';
import { userDb } from '../db/user';
import bcrypt from "bcryptjs";
import * as jose from 'jose'
/* 
    * Doing auth this way really hurts my soul, auth should never be done this way, it should be using the latest standards and a server of couse
    * however doing this for a demo project this is perfectly fine as it will never be used in production and is only for learning purposes. However
    * I wanted to make this aknowledgement, and to make sure no one uses this code in production.
*/

export const userService = {
    register,
    login,
    verifyUser,
    hasToken,
    verifyToken,
    getUserNames
}

export interface RegisterUser {
    name: string;
    username: string;
    password: string;
}

export interface User extends RegisterUser {
    id: string;
}

const SECRET = new TextEncoder().encode('newton-sysm8-demo-project');

async function verifyToken(token:string) {
    try {
        const jwt = await jose.jwtVerify(token, SECRET);
        return jwt.payload.id as string;
    } catch (e) {
        return false;
    }
}

function hasToken() {
    const token = localStorage.getItem("token");
    if (!token) return false;
    return true;
}

async function verifyUser(token: string, userId: string) {
    const { payload } = await jose.jwtVerify(token, SECRET);
    if (payload.id !== userId) return false;
    return true;
}

async function getUserNames(userIds: string[]) {
    const users = await userDb.getUsers(userIds);
    const names: {[key: string]: string} = {};
    users.forEach(u => {
        names[u.id] = u.name;
    });
    return names;
}

async function login(username: string, password: string) {
    const user = await userDb.getUser(username);
    if (!user) return false;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return false;

    // JWT SHOULD NOT BE DONE THIS WAY!!!
    // JWT should be signed by a key, not a string. JWT should have a access token and a refresh token; access token in memory and refresh token in a http only cookie
    // Once again, this is just for demo purposes and should never be used in production
    const token = await new jose.SignJWT({ id: user.id, username: user.username })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .sign(SECRET);
    return token;
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