import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable, throwError } from 'rxjs';
import { IS_PUBLIC_KEY } from './public-strategy';
import { Socket } from 'socket.io';
import { Handshake } from 'socket.io/dist/socket-types';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService, private reflector: Reflector){}

  async canActivate(
    context: ExecutionContext,
  ):Promise<boolean> {

    const isPublic = this.reflector.getAllAndOverride<boolean>
              (IS_PUBLIC_KEY, [
                context.getHandler(),
                context.getClass()
              ]);

    if(isPublic)
      return true;

    // of Type Request | HandShake
    const request = context.getType() !== 'ws' ? context.switchToHttp().getRequest() : context.switchToWs().getClient().handshake;
    const token = AuthGuard.extractTokenFromHeader(request);

    const { authorization } = request.headers;

    Logger.log({authorization}, 'I got the Auth for')
    Logger.log(context.getType())

    if(!token)
    {
      throw new UnauthorizedException();
    }
    try{
      const payload = await this.jwtService.verifyAsync(token, {secret: process.env.AUTH_SECRET});

      request['user'] = payload;
    }
    catch
    {
      throw new UnauthorizedException();
    }
    return true;
  }

  static extractTokenFromHeader(request: Request | Handshake): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
