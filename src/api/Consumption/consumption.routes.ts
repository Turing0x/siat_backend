import { Router } from "express";

import { ConsumptionControllers } from "./infraestructure/consumption.controllers";

const router = Router();

router

  .get("/", ConsumptionControllers.getAllConsumptions)

export const ConsumptionRouter = router;
