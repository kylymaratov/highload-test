import { Socket } from "socket.io";
import { NextFunction } from "express";
import { TSocket } from "../types/socket.types";
import { getCurrentStat } from "./task.script";

export class TaskSocket implements TSocket {
  async handleConnection(socket: Socket) {
    try {
      const data = await getCurrentStat();

      socket.emit("current_stat", data);
    } catch (e) {}
  }

  async middlewareImplementation(socket: Socket, next: NextFunction) {
    try {
      next();
    } catch (e) {}
  }
}
