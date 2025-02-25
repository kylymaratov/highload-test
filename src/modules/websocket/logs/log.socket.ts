import { Socket } from "socket.io";
import { NextFunction } from "express";
import { TSocket } from "../types/socket.types";

export class LogsSocket implements TSocket {
  async handleConnection(socket: Socket) {
    try {
      socket.emit("message", "Logs channel");
    } catch (e) {}
  }

  async middlewareImplementation(socket: Socket, next: NextFunction) {
    try {
      next();
    } catch (e) {}
  }
}
