import Exception from '@joseaburt/http-error';
import { NextFunction, Request, Response } from 'express';
import { JwtService, WithUserTokenPayload, UserTokenPayload } from '../../domain/auth/contracts';

export default function isAuthMiddleware(tokenService: JwtService) {
  return function (req: WithUserTokenPayload<Request>, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) throw new Exception(403, 'FORBIDDEN', 'AuthorizationError: Not access to resource allowed');
    if (!authorization.startsWith('Bearer ')) throw new Exception(403, 'FORBIDDEN', 'AuthorizationError: Invalid token format');
    const token = `${authorization}`.replace('Bearer ', '');

    try {
      req.user = tokenService.verify<UserTokenPayload>(token);
    } catch (error) {
      const { message } = Exception.parse(error);
      throw new Exception(403, 'FORBIDDEN', 'AuthorizationError: ' + message);
    }

    next();
  };
}
