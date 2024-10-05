import express from 'express';
import { UserRouter } from '../api/User/users.routes';
import { ExerciseRouter } from '../api/Exercise/exercises.routes';
import { SolutionRouter } from '../api/Solution/solutions.routes';
import { FilesRouter } from '../api/Files/files.routes';

export const api = express.Router();

api.use("/users", UserRouter);

api.use("/exercises", ExerciseRouter);

api.use("/solutions", SolutionRouter);

api.use("/files", FilesRouter);
