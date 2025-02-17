import router from "@/modules/controllers";
import express, { Express } from "express";
import { serverError } from "./server.exception";

export const setServerMiddlewares = (app: Express) => {
  app.use(express.json());
  app.use("/api/", router);
  app.use(serverError);
};
