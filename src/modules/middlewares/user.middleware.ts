import { body } from "express-validator";
import { checkValidation } from "./check.validation";

export const updateBalanceMiddleware = () => [
  body("userId")
    .isInt({ min: 1 })
    .withMessage("userId must be a positive integer"),
  body("amount")
    .notEmpty()
    .isNumeric()
    .withMessage("Amount must be a numeric value"),
  checkValidation,
];
