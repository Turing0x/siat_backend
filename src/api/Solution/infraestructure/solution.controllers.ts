import { Response, Request } from 'express';
import { SolutionModel } from '../domain/solution.module';
import { Solution } from '../models/solution.model';
import { UserModel } from '../../User/domain/user.module';
import mongoose from 'mongoose';

async function getAllSolutions(req: Request, res: Response) {

  try {
    const solutions = await SolutionModel.find()
      .populate(['student_id', 'exercise_id']);
    return res.json({
      success: true,
      data: solutions
    });
  } catch (error) { return res.status(404).json({
      success: false, data: []
    }); 
  }

}

async function getSolutionById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const solution = await SolutionModel.findById(id)
      .populate(['student_id', 'exercise_id']);

    return res.json({
      success: true,
      data: solution
    });
  } catch (error) { 
    return res.status(404).json({
      success: false, data: []
    }); 
  }
}

async function createSolution(req: Request, res: Response) {

  const { ex_id, student_id } = req.params;
  const solutionFile: Express.Multer.File = req.file;

  try {

    const mongoId = new mongoose.Types.ObjectId(ex_id)

    const students = await UserModel.find({type: 'student'});
    for ( const student of students ) {
      await UserModel.findByIdAndUpdate(student._id, {
        $pull: { pending_exercices: mongoId },
        $push: { finished_exercices: mongoId }
      }).then( (res) => {});
    }

    const newSolution = new SolutionModel({
      exercise_id: ex_id,
      student_id: student_id,
      file_name: solutionFile.filename
    });

    await newSolution.save();
    return res.json({
      success: true,
      data: newSolution
    });
  } catch (error) { 
    return res.status(404).json({
      success: false, data: []
    }); 
  }
}

async function getFileBySolution(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const solution = await SolutionModel.findById(id);
    if (!solution) {
      return res.status(404).json({
        success: false,
        data: []
      });
    }

    const exFile = solution.file_name;
    if (exFile) {
      const full_path = `./uploads/solutionFile/${exFile}`;
      if (full_path) {
        return res.download(full_path);
      }
    }

  } catch (error) { 
    return res.status(404).json({
      success: false, data: []
    }); 
  }
}

async function updateSolution(req: Request, res: Response) {
  const { id } = req.params;
  const solution: Solution = req.body;
  try {
    await SolutionModel.findByIdAndUpdate(id, solution);
    return res.json({
      success: true,
      data: solution
    });
  } catch (error) { return res.status(404).json({
      success: false, data: []
    }); 
  }
}

async function deleteSolution(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await SolutionModel.findByIdAndDelete(id);
    return res.json({
      success: true,
      data: []
    });
  } catch (error) { return res.status(404).json({
      success: false, data: []
    }); 
  }
}

export const SolutionControllers = {
  getFileBySolution,
  getAllSolutions,
  getSolutionById,
  createSolution,
  updateSolution,
  deleteSolution
}