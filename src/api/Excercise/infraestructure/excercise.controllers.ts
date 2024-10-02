import { Response, Request } from 'express';

import { ExerciseModel } from '../domain/excercise.module';
import { Exercise } from '../models/excercise.model';
import { UserModel } from '../../User/domain/user.module';

import fs from 'fs';

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

  const data: Exercise = req.body;

  
  const exFile = req.files['exFile'];
  const solFile = req.files['possibleSolFile'];
  
  try {

    const newExercise = new ExerciseModel(data);

    newExercise.exercise_files = exFile[0].filename;
    newExercise.solution = solFile ? solFile[0].filename : null;

    await newExercise.save();

    const students = await UserModel.find({type: 'student'});

    for ( const student of students ) {
      await UserModel.findByIdAndUpdate(student._id, {
        $push: { pending_exercices: newExercise._id } 
        }
      ).then( (res) => {});
    }

    return res.json({
      success: true,
      data: newExercise
    });

  } catch (error) { 
    console.log(error);
    return res.status(404).json({
      success: false, data: error
    }); 
  }
}

async function updateExercise(req: Request, res: Response) {

  const { id } = req.params;
  const { description, annotations } = req.body;

  try {

    const existingExercise = await ExerciseModel.findById(id);
    if (!existingExercise) {
      return res.status(404).json({
        success: false,
        data: []
      });
    }

    const updated = Object.assign(existingExercise, {description, annotations});
    await ExerciseModel.findByIdAndUpdate(id, updated);

    return res.json({
      success: true,
      data: updated
    });
  } catch (error) { return res.status(404).json({
      success: false, data: []
    }); 
  }
}

async function addFilesToExercise(req: Request, res: Response) {

  const { id } = req.params;

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

    const students = await UserModel.find({type: 'student'});
    const excercises = await ExerciseModel.findById(id);

    for ( const student of students ) {
      await UserModel.findByIdAndUpdate(student._id, {
        $pull: { pending_exercices: excercises._id } 
      }
      ).then( (res) => console.log(res) );
    }
    
    [excercises.exercise_files, excercises.solution].forEach(async (file, index) => {

      const define_folder = index === 0 ? 'exercises' : 'possibleSolFile';
      const full_path = `./uploads/${define_folder}/${file}`;
      if (full_path) {
        fs.unlink(full_path, (err) => {
          if (err) throw err;
        });
      }
    });

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
