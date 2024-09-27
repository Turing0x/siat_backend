import { Response, Request } from 'express';

import { RoleModel } from '../domain/role.module';

async function getAllRoles(req: Request, res: Response) {
    try {
        const roles = await RoleModel.find();
    return res.json({
        success: true,
        data: roles
        });
    } catch (error) { return res.status(404).json({
        success: false, data: []
        }); 
    }
    
}

async function getRoleById(req: Request, res: Response) {
    const { roleId } = req.params;
    console.log(roleId);
    try {
        const role = await RoleModel.findById(roleId);
        return res.json({
            success: true,
            data: role
        });
    } catch (error) { return res.status(404).json({
        success: false, data: []
        }); 
    }
}

async function createRole(req: Request, res: Response) {
    const role = req.body;
    const newRole = new RoleModel(role);
    try {
        await newRole.save();
        return res.json({
            success: true,
            data: newRole
        });
    } catch (error) { return res.status(404).json({
        success: false, data: []
        }); 
    }
}

async function updateRole(req: Request, res: Response) {
    const { roleId } = req.params;
    const role = req.body;
    try {
        await RoleModel.findByIdAndUpdate(roleId, role);
        return res.json({
            success: true,
            data: role
        });
    } catch (error) { return res.status(404).json({
        success: false, data: []
        }); 
    }
}

async function deleteRoleById(req: Request, res: Response) {
    const { roleId } = req.params;
    try {
        await RoleModel.findByIdAndDelete(roleId);
        return res.json({
            success: true,
            data: []
        });
    } catch (error) { return res.status(404).json({
        success: false, data: []
        }); 
    }
}

export const RoleController = { 
    getAllRoles,
    getRoleById, 
    createRole, 
    updateRole,
    deleteRoleById
};