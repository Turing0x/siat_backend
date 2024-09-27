import { Router } from "express";

import { ExerciseControllers } from "./infraestructure/exercise.controllers";

const router = Router()

router

  .get('/', ExerciseControllers.getAllExercises)
  .get('/:id', ExerciseControllers.getExerciseById)

  .post('/', ExerciseControllers.createExercise)
  .put('/:id', ExerciseControllers.updateExercise)

  .delete('/:id', ExerciseControllers.deleteExerciseById)
export const ExerciseRouter = router