import express from 'express';
import UserController from '../controllers/users.controller';
import UserRepository from '../../domain/users/index.repository';

export default function initRouter(repository: UserRepository): express.Router {
  const usersRouter = express.Router();
  const userController = new UserController(repository);

  usersRouter.get('/:id', userController.findById);

  return usersRouter;
}
