import { Router } from 'express';

import { RoleController } from './infraestructure/role.controllers';

const router = Router()

router

  .get('/', RoleController.getAllRoles)
  .get('/:roleId', RoleController.getRoleById)

  .post('/', RoleController.createRole)

  .put('/:roleId', RoleController.updateRole)

  .delete('/:roleId', RoleController.deleteRoleById)
export const RolesRouter = router