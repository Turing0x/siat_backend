import express from "express";
import { UserRouter } from "../api/User/users.routes";
import { WorkerRouter } from "../api/Worker/worker.routes";
import { ConsumptionRouter } from "../api/Consumption/consumption.routes";

export const api = express.Router();

api.use("/users", UserRouter);
api.use("/workers", WorkerRouter);
api.use("/consumptions", ConsumptionRouter);
