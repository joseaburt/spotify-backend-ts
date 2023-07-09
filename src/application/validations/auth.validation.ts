import { z as zod } from 'zod';
import ZodValidation from '../../shared/validation';

const loginCredentialsPayload = zod.object({
  email: zod.string().email({ message: 'Invalid email' }),
  password: zod.string({ required_error: 'Password is required' }),
});

export const validateLoginCredentialsPayload = ZodValidation.createValidatorFromSchema(loginCredentialsPayload);
