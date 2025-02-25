import router from "@/modules/controllers";
import express, { Express } from "express";
import { serverError } from "./server.exception";
import * as path from "path";

export const setServerMiddlewares = (app: Express) => {
  const staticPath = path.join(__dirname, "../../../", "public");

  app.use(express.static(staticPath));
  app.use(express.json());
  app.use("/api/", router);
  app.get("/", (req, res) => res.sendFile(staticPath + "/index.html"));
  app.use(serverError);
};
