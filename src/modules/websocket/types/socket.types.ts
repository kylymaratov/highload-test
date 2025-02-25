import { Socket } from "socket.io";

export interface TSocket {
  handleConnection(socket: Socket): void;
  middlewareImplementation?(socket: Socket, next: any): void;
}
