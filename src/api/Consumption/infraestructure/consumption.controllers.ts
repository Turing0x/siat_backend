import { Response, Request } from "express";

import { ConsumptionManager } from "./consumption.querys";

async function getAllConsumptions(req: Request, res: Response) {
  try {
    const consumptions = await ConsumptionManager("all");
    return res.json(consumptions);
  } catch (error) {
    return res.status(404).json({
      success: false,
      data: [],
    });
  }
}

export const ConsumptionControllers = {
  getAllConsumptions
};
