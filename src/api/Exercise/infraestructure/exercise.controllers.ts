import { Response, Request } from 'express';

import { ExerciseModel } from '../domain/exercise.module';
import { Exercise } from '../models/exercise.model';

async function getAllExercises(req: Request, res: Response) {

  try {
    const exercises = await ExerciseModel.find();
    return res.json({
      success: true,
      data: exercises
    });
  } catch (error) { return res.status(404).json({
      success: false, data: []
    }); 
  }

}

async function getExerciseById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const exercise = await ExerciseModel.findById(id);
    return res.json({
      success: true,
      data: exercise
    });
  } catch (error) { return res.status(404).json({
      success: false, data: []
    }); 
  }
}

async function createExercise(req: Request, res: Response) {
  const exercise: Exercise = req.body;
  const newExercise = new ExerciseModel(exercise);
  try {
    await newExercise.save();
    return res.json({
      success: true,
      data: newExercise
    });
  } catch (error) { return res.status(404).json({
      success: false, data: []
    }); 
  }
}

async function updateExercise(req: Request, res: Response) {
  const { id } = req.params;
  const exercise: Exercise = req.body;
  try {
    await ExerciseModel.findByIdAndUpdate(id, exercise);
    return res.json({
      success: true,
      data: exercise
    });
  } catch (error) { return res.status(404).json({
      success: false, data: []
    }); 
  }
}

async function deleteExerciseById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await ExerciseModel.findByIdAndDelete(id);
    return res.json({
      success: true,
      data: []
    });
  } catch (error) { return res.status(404).json({
      success: false, data: []
    }); 
  }
}

export const ExerciseControllers = { 
  getAllExercises, 
  getExerciseById, 
  createExercise, 
  updateExercise, 
  deleteExerciseById
};
