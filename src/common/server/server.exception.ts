import { NextFunction, Request, Response } from "express";
import { serverConfig } from "./server.config";

export class ServerError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ServerError";
    Error.captureStackTrace(this, ServerError);
  }
}

export const serverError = (
  error: ServerError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ServerError) {
    res.status(error.statusCode).json({
      message: error.message,
      path: req.url,
      stack: serverConfig.ISDEV ? error.stack : undefined,
    });
  } else {
    res.status(500).json({
      message: "Internal server error",
      path: req.url,
    });
  }
};
