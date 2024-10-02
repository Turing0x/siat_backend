import { Router } from 'express';

import { UserControllers } from './infraestructure/user.controllers';

const router = Router()

router

  .get('/', UserControllers.getAllUsers)
  .get('/:id', UserControllers.getUserById)
  .get('/finished/:id', UserControllers.getUserFinishedExercises)
  .get('/pending/:id', UserControllers.getUserPendingExercises)

  .post('/', UserControllers.saveUser)
  .post('/signin', UserControllers.sign)
  .post('/changePassword', UserControllers.changePassword)

  // .put('/:id', UserControllers.editUser)

  .delete('/:id', UserControllers.deleteUserById)
export const UserRouter = router