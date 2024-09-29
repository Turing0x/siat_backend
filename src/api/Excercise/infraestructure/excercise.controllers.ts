import { Response, Request } from 'express';

import { ExerciseModel } from '../domain/excercise.module';
import { Exercise } from '../models/excercise.model';
import { UserModel } from '../../User/domain/user.module';

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

    const excercises = await ExerciseModel.findById(id);

    return res.json({
      success: true,
      data: excercises
    });
  } catch (error) { return res.status(404).json({
      success: false, data: []
    }); 
  }
}

async function createExercise(req: Request, res: Response) {

  const excercises: Exercise = req.body;
  const newExercise = new ExerciseModel(excercises);

  try {

    const students = await UserModel.find({type: 'student'});
    const excercises = await newExercise.save();

    for ( const student of students ) {
      await UserModel.findByIdAndUpdate(student._id, {
        $push: { pending_exercices: excercises._id } 
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

async function getFileByExercise(req: Request, res: Response) {

  const { id } = req.params;

  try {

    const existingExercise = await ExerciseModel.findById(id);
    if (!existingExercise) {
      return res.status(404).json({
        success: false,
        data: []
      });
    }

    return res.json({
      success: true,
      data: existingExercise.exercise_files_info
    });

  } catch (error) { return res.status(404).json({
      success: false, data: []
    }); 
  }
}

async function updateExercise(req: Request, res: Response) {

  const { id } = req.params;
  const excercises: Exercise = req.body;

  try {

    const existingExercise = await ExerciseModel.findById(id);
    if (!existingExercise) {
      return res.status(404).json({
        success: false,
        data: []
      });
    }

    const updated = Object.assign(existingExercise, excercises);
    await ExerciseModel.findByIdAndUpdate(id, updated);

    return res.json({
      success: true,
      data: excercises
    });
  } catch (error) { return res.status(404).json({
      success: false, data: []
    }); 
  }
}

async function addFilesToExercise(req: Request, res: Response) {

  const { id } = req.params;
  const file: File = req.body;

  console.log('file :>> ', file);

  try {

    const existingExercise = await ExerciseModel.findById(id);
    if (!existingExercise) {
      return res.status(404).json({
        success: false,
        data: []
      });
    }

    // const updated = Object.assign(
    //   existingExercise,
    //   { 
    //     exercise_files_info: [
    //       ...existingExercise.exercise_files_info, 
    //       ...
    //     ] 
    //   }
    // )

    // await ExerciseModel.findByIdAndUpdate(id, updated);

    return res.json({ success: true, data: 'updated' });

  } catch (error) { return res.status(404).json({
      success: false, data: error.message
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
  addFilesToExercise,
  deleteExerciseById,
  getAllExercises, 
  getExerciseById, 
  createExercise, 
  updateExercise, 
};
