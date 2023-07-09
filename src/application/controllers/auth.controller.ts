import { Request, Response } from 'express';
import Exception from '@joseaburt/http-error';
import AuthService from '../../domain/auth/auth.service';
import { validateLoginCredentialsPayload } from '../validations/auth.validation';

export default class AuthController {
  constructor(private authService: AuthService) {
    this.login = this.login.bind(this);
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      validateLoginCredentialsPayload(req.body);
      const userWithToken = await this.authService.login(req.body);
      res.status(200).send(userWithToken);
    } catch (error) {
      const { status, ...response } = Exception.parse(error);
      res.status(status).send(response);
    }
  }
}
