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
    const res = await httpClient.get(`/users`, { params: { username } });
    return res.data;
}