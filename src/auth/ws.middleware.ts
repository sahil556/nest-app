import { Socket } from "socket.io"
import { AuthGuard } from "./auth.guard";
import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export type SocketIOMiddleWare = {
    (client: Socket, next: (err?: Error) => void);
};

export const SocketAuthMiddleware = (jwtService: JwtService):SocketIOMiddleWare => {
    return async (client, next) => {
        try {
            const token = AuthGuard.extractTokenFromHeader(client.handshake);
            if(!token)
            {
                throw new UnauthorizedException();
            }
            const payload = await jwtService.verifyAsync(token, {secret: process.env.AUTH_SECRET});

            client = Object.assign(client, {
                user: payload
            });
            next();
        }
        catch(error)
        {
            console.log('UnAuthorised client connection', error)
            next(new UnauthorizedException());
        }
    }
}