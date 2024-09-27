import { Router } from 'express';

import { SolutionControllers } from './infraestructure/solution.controllers';

const router = Router();

router

  .get('/', SolutionControllers.getAllSolutions)
  .get('/:id', SolutionControllers.getSolutionById)

  .post('/', SolutionControllers.createSolution)

  .put('/:id', SolutionControllers.updateSolution)

  .delete('/:id', SolutionControllers.deleteSolution)
  export const SolutionRouter = router

