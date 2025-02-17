import { UserService } from "@/modules/services/user.service";
import { Router } from "express";
import { updateBalanceMiddleware } from "../middlewares/user.middleware";

const userController = Router();
const userService = new UserService();

userController.get("/all", userService.getAll);
userController.post(
  "/update-balance",
  updateBalanceMiddleware(),
  userService.updateBalance
);

export default userController;
