/* 
    * Doing the checking this way also hurts my soul, the checking of the answer and point giving should be done by server; not on the client
*/

import { exercisesDb } from "../db/exercises";
import { userDb } from "../db/user";
import { userService } from "./user";

export const exercisesService = {
    register,
    getStatsData
}

export interface ExerciseResult {
    exerciseId: string;
    correct: boolean;
    points: number;
    timeSpent: number;
    ended: number;
    question: string;
    studentAnswer: string;
}

export interface ExerciseEntry extends ExerciseResult {
    userId: string;
}

async function register(token: string, result: ExerciseResult) {
    const userId = await userService.verifyToken(token);
    if (!userId) return false;
    await exercisesDb.addExercise({
        ...result,
        userId
    })
}

async function getStatsData(token: string) {
    const userId = await userService.verifyToken(token);
    if (!userId) return false;
    const userType = await userService.verifyUserType(token);
    let userIds = [] as string[];
    if (userType === 'student') {
        userIds = [userId];
    } else if (userType === 'teacher') {
        const classCode = await userService.verifyTeacherClassCode(token);
        const students = await userDb.getUsers({ type: 'student', classCode });
        userIds = students.map(s => s.id);
    } else if (userType === 'parent') {
        const parent = (await userDb.getUsers({ id: await userService.verifyToken(token) }))[0];
        if (!parent) return false;
        const students = await userDb.getUsers({ type: 'student', parentUsername: parent.username });
        userIds = students.map(s => s.id);
    }
    const exercises = await exercisesDb.getExercises(userIds);
    const names = await userService.getUserNames(userIds);

    const data = {} as any;
    userIds.forEach(id => {
        const name = names[id] || "Okänd användare";
        data[name] = exercises.filter(e => e.userId === id);
    });

    console.log(data);
    return data;
}
