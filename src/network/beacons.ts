import { httpClient } from "./client";

export const userService = {
    getUser,
}

async function getUser(username: string) {
    const res = await httpClient.get(`/users`, { params: { username } });
    return res.data;
}