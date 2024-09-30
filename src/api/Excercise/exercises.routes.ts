import { Router } from "express";

import { ExerciseControllers } from "./infraestructure/excercise.controllers";
import { upload } from "../../database/multer.config";

const router = Router()

router

  .get('/', ExerciseControllers.getAllExercises)
  .get('/:id', ExerciseControllers.getExerciseById)

  .post('/', ExerciseControllers.createExercise)
  .post('/solution/:id', ExerciseControllers.addFilesToExercise)
  
  .put('/:id', upload.single('file'), ExerciseControllers.updateExercise)
  
  .delete('/:id', ExerciseControllers.deleteExerciseById)
export const ExerciseRouter = router