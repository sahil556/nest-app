import { Socket } from "socket.io"
import { AuthGuard } from "./auth.guard";
import { UnauthorizedException } from "@nestjs/common";

export type SocketIOMiddleWare = {
    (client: Socket, next: (err?: Error) => void);
};

export const SocketAuthMiddleware = ():SocketIOMiddleWare => {
    return (client, next) => {
        try {
            AuthGuard.validateToken(client);
            next();
        }
        catch(error)
        {
            next(new UnauthorizedException());
        }
    }
}