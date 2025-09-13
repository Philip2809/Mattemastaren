import type { User } from "../fake-backend/user";
import { httpClient } from "./client";

export const userDb = {
    addUser, // C
    getUser, // R
}

async function addUser(user: User) {
    const res = await httpClient.post(`/users`, user);
    return res.data;
}

async function getUser(username: string) {
    const res = await httpClient.get<User[]>(`/users`, { params: { username } });
    const users: User[] = res.data;
    if (users.length === 0) return undefined;
    if (users.length > 1) throw new Error("Multiple users with same username");
    return res.data[0] as User;
}