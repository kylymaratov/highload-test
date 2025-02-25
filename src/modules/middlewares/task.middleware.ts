import { body, param } from "express-validator";
import { checkValidation } from "./check.validation";

export const addTaskMiddleware = () => [
  body("name").notEmpty().withMessage("Task name required"),
  body("interval_seconds")
    .notEmpty()
    .isNumeric()
    .withMessage("Interval must be a numeric value"),
  checkValidation,
];

export const getTaskMiddleware = () => [
  param("name").notEmpty().withMessage("Task name required"),
  checkValidation,
];
