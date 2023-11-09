import { Router } from 'express';
import UserController from '../controller/UserController';
import validate from '../middlwears/validate';
import userSchema from '../schema/userSchema';

const router = Router();

router.post('/login', UserController.login);

router.post(
  '/register',
  validate(userSchema.create),
  UserController.register,
);

router.post(
  '/auth',
  validate(userSchema.auth),
  UserController.auth,
);

router.get(
  '/list',
  validate(userSchema.list, 'query'),
  UserController.list,
);

export default router;
