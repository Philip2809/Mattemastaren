import type { ExerciseEntry } from "../fake-backend/exercises";
import { httpClient } from "./client";

export const exercisesDb = {
    addExercise, // C
    getExercises, // R
}

async function addExercise(exercise: ExerciseEntry) {
    const res = await httpClient.post(`/exercises`, exercise);
    return res.data;
}

async function getExercises(userId: string[]) {
    const res = await httpClient.get<ExerciseEntry[]>(`/exercises`, { params: { userId: userId } });
    return res.data;
}