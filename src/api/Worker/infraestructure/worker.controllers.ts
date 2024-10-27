import { Response, Request } from "express";
import { v4 as uuidv4 } from 'uuid';

import { TWorker } from "../models/worker.model";
import { WorkersManager } from "./worker.querys";

async function getAllWorkers(req: Request, res: Response) {
  try {
    const workers = await WorkersManager("all");
    return res.json(workers);
  } catch (error) {
    return res.status(404).json({
      success: false,
      data: [],
    });
  }
}

async function getWorkerById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id)
      return res.json({ success: false, msg: "Trabajador no encontrado" });

    const worker = await WorkersManager("byid", { id });
    if (!worker)
      return res.json({ success: false, msg: "Trabajador no encontrado" });

    return res.json({ success: true, data: worker });
  } catch (error) {
    return res.json({ success: false, msg: "Error al obtener usuario" });
  }
}

async function saveWorker(req: Request, res: Response) {
  try {
    const newWorker: TWorker = req.body;

    newWorker.id = uuidv4();
    const worker = await WorkersManager("save", newWorker);

    return res.json({
      success: true,
      data: worker,
      msg: "Trabajador creado exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: error,
    });
  }
}

async function editWorker(req: Request, res: Response) {
  try {
    const workerData: TWorker = req.body;

    const worker = await WorkersManager("byid", { id: workerData.id });
    if (!worker)
      return res.json({ success: false, msg: "Trabajador no encontrado" });

    const editedUser: TWorker = Object.assign(worker, req.body);
    await WorkersManager("update", editedUser);

    return res.json({ success: true }).status(200);
  } catch (error) {
    return res.json({ success: false, msg: "Error al editar" });
  }
}

async function deleteWorkerById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id)
      return res.json({ success: false, msg: "Trabajador no encontrado" });

    await WorkersManager("delete", { id });

    return res.json({ success: true, msg: "Trabajador eliminado" });
  } catch (error) {
    return res.json({ success: false, msg: "Error al eliminar" });
  }
}

export const WorkerControllers = {
  deleteWorkerById,
  getWorkerById,
  getAllWorkers,
  editWorker,
  saveWorker,
};
