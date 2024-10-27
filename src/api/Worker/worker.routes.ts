import { Router } from "express";

import { WorkerControllers } from "./infraestructure/worker.controllers";

const router = Router();

router

  .get("/", WorkerControllers.getAllWorkers)
  .get("/:id", WorkerControllers.getWorkerById)

  .post("/", WorkerControllers.saveWorker)

  .delete("/:id", WorkerControllers.deleteWorkerById);

export const WorkerRouter = router;
