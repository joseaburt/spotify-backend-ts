import express from 'express';
import AuthService from '../../domain/auth/auth.service';
import AuthController from '../controllers/auth.controller';

export default function initRouter(service: AuthService): express.Router {
  const authRouter = express.Router();
  const authController = new AuthController(service);

  authRouter.post('/login', authController.login);

  return authRouter;
}
