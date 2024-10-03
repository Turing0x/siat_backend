import { Response, Request } from 'express';

import { ExerciseModel } from '../domain/exercise.module';
import { Exercise } from '../models/exercise.model';
import { UserModel } from '../../User/domain/user.module';

import fs from 'fs';
import { SolutionModel } from '../../Solution/domain/solution.module';
import mongoose from 'mongoose';

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

    const exercises = await ExerciseModel.findById(id);

    return res.json({
      success: true,
      data: exercises
    });
  } catch (error) { return res.status(404).json({
      success: false, data: []
    }); 
  }
}

async function getFinishedById(req: Request, res: Response) {

  const { id } = req.params;

  try {

    const exercise = await ExerciseModel.findById(id);
    const solution = await SolutionModel.find({ exercise_id: id });

    return res.json({
      success: true,
      data: [exercise, ...solution]
    });

  } catch (error) { return res.status(404).json({
      success: false, data: []
    }); 
  }
}

async function createExercise(req: Request, res: Response) {

  const data: Exercise = req.body;
  
  const exFile: Express.Multer.File = req.files['exFile'];
  const solFile: Express.Multer.File = req.files['possibleSolFile'];
  
  try {

    const newExercise = new ExerciseModel(data);

    newExercise.exercise_files = exFile[0].filename;
    newExercise.solution = solFile ? solFile[0].filename : null;

    await newExercise.save();

    const students = await UserModel.find({type: 'student'});
    for ( const student of students ) {
      if( data.destine === '0' ){
        await UserModel.findByIdAndUpdate(student._id, {
          $push: { pending_exercices: newExercise._id } 
          }
        ).then( (res) => {});
      } else {
        if( student.group === data.destine ){
          await UserModel.findByIdAndUpdate(student._id, {
            $push: { pending_exercices: newExercise._id } 
            }
          ).then( (res) => {});
        }
      }
    }

    return res.json({
      success: true,
      data: newExercise
    });

  } catch (error) { 
    return res.status(404).json({
      success: false, data: error
    }); 
  }
}

async function updateExercise(req: Request, res: Response) {

  const { id } = req.params;
  const exce: Exercise = req.body;

  try {

    const exFile: Express.Multer.File = req.files['exFile'];
    const solFile: Express.Multer.File = req.files['possibleSolFile'];

    const existingExercise = await ExerciseModel.findById(id);
    if (!existingExercise) {
      return res.status(404).json({
        success: false,
        data: []
      });
    }

    exce.exercise_files = exFile[0].filename;
    exce.solution = solFile ? solFile[0].filename : null;

    const updated = Object.assign(existingExercise, exce);
    await ExerciseModel.findByIdAndUpdate(id, updated);

    return res.json({
      success: true,
      data: updated
    });
  } catch (error) { 
    return res.status(404).json({
      success: false, data: []
    }); 
  }
}

async function getFileByExcercise(req: Request, res: Response) {

  const { id } = req.params;

  try {

    const existingExercise = await ExerciseModel.findById(id);
    if (!existingExercise) {
      return res.status(404).json({
        success: false,
        data: []
      });
    }

    const exFile = existingExercise.exercise_files;
    if (exFile) {
      const full_path = `./uploads/exercises/${exFile}`;
      if (full_path) {
        return res.download(full_path);
      }
    }

    return res.json({
      success: false,
      data: []
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
    const exercises = await ExerciseModel.findById(id);
    
    await SolutionModel.findOneAndDelete({
      exercise_id: id
    }).then(); 

    for ( const student of students ) {
      await UserModel.findByIdAndUpdate(student._id, {
        $pull: { 
          pending_exercices: exercises._id, 
          finished_exercices: exercises._id 
        }
      }).then();
    }
  
    [exercises.exercise_files, exercises.solution].forEach(async (file, index) => {

      const define_folder = index === 0 ? 'exercises' : 'possibleSolFile';
      const full_path = `./uploads/${define_folder}/${file}`;
      if (full_path) {
        fs.existsSync(full_path) && fs.unlinkSync(full_path);
      }
    });

    await ExerciseModel.findByIdAndDelete(id);
    
    return res.json({
      success: true,
      data: []
    });
  } catch (error) { 
    return res.status(404).json({
      success: false, data: []
    }); 
  }
}

export const ExerciseControllers = { 
  getFileByExcercise,
  addFilesToExercise,
  deleteExerciseById,
  getFinishedById,
  getAllExercises, 
  getExerciseById, 
  createExercise, 
  updateExercise, 
};
