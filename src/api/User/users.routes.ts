import { Router } from 'express';

import { UserControllers } from './infraestructure/user.controllers';

const router = Router()

router

  .get('/', UserControllers.getAllUsers)
  .get('/:userId', UserControllers.getUserById)

  .post('/', UserControllers.saveUser)
  .post('/signin', UserControllers.sign)
  .post('/changePassword', UserControllers.changePassword)

  // .put('/:userId', UserControllers.editUser)

  .delete('/:userId', UserControllers.deleteUserById)
export const UserRouter = router