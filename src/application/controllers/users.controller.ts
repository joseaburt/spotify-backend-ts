import { Request, Response } from 'express';
import UserRepository from '../../domain/users/index.repository';

export default class UserController {
  constructor(private userRepository: UserRepository) {
    this.findById = this.findById.bind(this);
  }

  public async findById(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    const user = await this.userRepository.findById(parseInt(userId));
    if (!user) res.status(404).send({ message: `User with id "${userId}" not found.` });
    else res.status(200).send(user);
  }
}
