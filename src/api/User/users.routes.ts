import { Router } from "express";

import { UserControllers } from "./infraestructure/user.controllers";

const router = Router();

router

  .get("/", UserControllers.getAllUsers)
  .get("/:id", UserControllers.getUserById)

  .post("/", UserControllers.saveUser)
  .post("/signin", UserControllers.sign)
  .post("/changePassword", UserControllers.changePassword)

  .delete("/:id", UserControllers.deleteUserById);
export const UserRouter = router;
