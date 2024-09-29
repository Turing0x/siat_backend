import { Router } from 'express';

import { SolutionControllers } from './infraestructure/solution.controllers';
import { upload } from '../../database/multer.config';

const router = Router();

router

  .get('/', SolutionControllers.getAllSolutions)
  .get('/:id', SolutionControllers.getSolutionById)

  .post('/:ex_id/:student_id', upload.single('file'), SolutionControllers.createSolution)

  .put('/:id', SolutionControllers.updateSolution)

  .delete('/:id', SolutionControllers.deleteSolution)
  export const SolutionRouter = router

