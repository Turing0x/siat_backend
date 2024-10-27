import express from "express";
import { UserRouter } from "../api/User/users.routes";
import { WorkerRouter } from "../api/Worker/worker.routes";

export const api = express.Router();

api.use("/users", UserRouter);
api.use("/workers", WorkerRouter);
