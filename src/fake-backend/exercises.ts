/* 
    * Doing the checking this way also hurts my soul, the checking of the answer and point giving should be done by server; not on the client
*/

import { exercisesDb } from "../db/exercises";
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
    const exercises = await exercisesDb.getExercises([userId]);

    const data = {} as any;
    [userId].forEach(id => {
        data[id] = exercises.filter(e => e.userId === id);
    });

    return data;
}
