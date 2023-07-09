import { Request, Response } from 'express';
import Exception from '@joseaburt/http-error';
import UserRepository from '../../domain/users/index.repository';
import { validateCreateUserPayload } from '../validations/user.validation';

export default class UserController {
  constructor(private userRepository: UserRepository) {
    this.create = this.create.bind(this);
    this.findById = this.findById.bind(this);
  }

  public async findById(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    const user = await this.userRepository.findById(parseInt(userId));
    if (!user) res.status(404).send({ message: `User with id "${userId}" not found.` });
    else res.status(200).send(user);
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      validateCreateUserPayload(req.body);
      const id = await this.userRepository.create(req.body);
      res.status(201).send({ message: 'User created', id });
    } catch (error) {
      const { status, ...response } = Exception.parse(error);
      res.status(status).send(response);
    }
  }
}
