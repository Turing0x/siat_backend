import { Router } from "express";

import { ExerciseControllers } from "./infraestructure/exercise.controllers";
import { upload } from "../../database/multer.config";

const router = Router();

router

  .get("/", ExerciseControllers.getAllExercises)
  .get("/:id", ExerciseControllers.getExerciseById)
  .get("/download/:id", ExerciseControllers.getFileByExcercise)
  .get("/finished/:id", ExerciseControllers.getFinishedById)

  .post(
    "/",
    upload.fields([
      { name: "exFile", maxCount: 1 },
      { name: "possibleSolFile", maxCount: 1 },
    ]),
    ExerciseControllers.createExercise
  )

  .post("/solution/:id", ExerciseControllers.addFilesToExercise)

  .put(
    "/:id",
    upload.fields([
      { name: "exFile", maxCount: 1 },
      { name: "possibleSolFile", maxCount: 1 },
    ]),
    ExerciseControllers.updateExercise
  )

  .delete("/:id", ExerciseControllers.deleteExerciseById);

export const ExerciseRouter = router;
