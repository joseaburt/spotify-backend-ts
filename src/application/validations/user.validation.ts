import { z as zod } from 'zod';
import ZodValidation from '../../shared/validation';

const createUserPayload = zod.object({
  email: zod.string().email({ message: 'Invalid email' }),
  firstName: zod.string({ required_error: 'FirstName is required' }).min(2, { message: 'FirstName is too short' }).max(12, { message: 'FirstName is too large' }),
  lastName: zod.string({ required_error: 'LastName is required' }).min(2, { message: 'LastName is too short' }).max(12, { message: 'LastName is too large' }),
  password: zod.string().regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, { message: 'Invalid password' }),
});

export const validateCreateUserPayload = ZodValidation.createValidatorFromSchema(createUserPayload);
