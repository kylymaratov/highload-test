import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { serverConfig } from "@/common/server/server.config";
import { TSocket } from "./types/socket.types";
import serverEmitter from "@/common/server/server.emitter";
import { getCurrentStat } from "./task/task.script";

export class SocketIo extends Server {
  private static io: SocketIo;

  constructor(httpServer: HttpServer) {
    super(httpServer, {
      cors: { origin: serverConfig.ISDEV ? "*" : "/" },
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: true,
      serveClient: false,
      maxHttpBufferSize: 1e8,
    });

    serverEmitter.on("task_log", (data) => {
      this.of("/logs").emit("task_log", data);
    });
    serverEmitter.on("update_current_stat", async () => {
      const data = await getCurrentStat();

      this.of("/tasks").emit("current_stat", data);
    });
  }

  static getInstance(httpServer: HttpServer): SocketIo {
    SocketIo;
    if (!SocketIo.io) {
      SocketIo.io = new SocketIo(httpServer);
    }

    return SocketIo.io;
  }

  initializeHandlers(
    socketHandlers: Array<{
      path: string;
      handler: TSocket;
    }>
  ) {
    socketHandlers.forEach((element) => {
      let namespace = SocketIo.io.of(element.path, (socket: Socket) => {
        element.handler.handleConnection(socket);
      });

      if (element.handler.middlewareImplementation) {
        namespace.use(element.handler.middlewareImplementation);
      }
    });
  }
}
