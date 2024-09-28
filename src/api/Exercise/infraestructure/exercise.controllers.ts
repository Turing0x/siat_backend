import { Response, Request } from 'express';

import { ExerciseModel } from '../domain/exercise.module';
import { Exercise } from '../models/exercise.model';
import { UserModel } from '../../User/domain/user.module';
import { User } from '../../User/models/user.model';

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

    const students = await UserModel.find({type: 'student'});
    const exercise = await newExercise.save();

    for ( const student of students ) {
      await UserModel.findByIdAndUpdate(student._id, {
        $push: { pending_exercices: exercise._id } 
        }
      ).then( (res) => console.log(res) );
    }

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
