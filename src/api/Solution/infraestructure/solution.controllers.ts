import { Response, Request } from 'express';
import { SolutionModel } from '../domain/solution.module';
import { Solution } from '../models/solution.model';

import path from 'path';

async function getAllSolutions(req: Request, res: Response) {

  try {
    const solutions = await SolutionModel.find();
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
    const solution = await SolutionModel.findById(id);
    return res.json({
      success: true,
      data: solution
    });
  } catch (error) { return res.status(404).json({
      success: false, data: []
    }); 
  }
}

async function createSolution(req: Request, res: Response) {

  const { ex_id, student_id } = req.params;

  try {

    const newSolution = new SolutionModel({
      exercise_id: ex_id,
      student_id: student_id,
      file_name: 'id_file_name'
    });

    await newSolution.save();
    return res.json({
      success: true,
      data: newSolution
    });
  } catch (error) { return res.status(404).json({
      success: false, data: []
    }); 
  }
}

async function getFileBySolution(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const solution = await SolutionModel.find({exercise_id: id});
    if (!solution) {
      return res.status(404).json({
        success: false,
        data: []
      });
    }

    const fileName = path.join(process.cwd(), './uploads', `${solution[0].file_name}.rar`);
    return res.status(200).sendFile(fileName);

  } catch (error) { 
    console.log(error);
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