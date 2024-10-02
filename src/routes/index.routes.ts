import express from 'express';
import { UserRouter } from '../api/User/users.routes';
import { ExerciseRouter } from '../api/Excercise/exercises.routes';
import { SolutionRouter } from '../api/Solution/solutions.routes';

export const api = express.Router();

api.use("/users", UserRouter);

api.use("/excercises", ExerciseRouter);

api.use("/solutions", SolutionRouter);
