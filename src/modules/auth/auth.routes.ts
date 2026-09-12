import { Router } from 'express';

import { register, login, logout } from './auth.controller.js';
import { loginValidation, registerValidation, tokenValidation } from './auth.validation.js';

export const authRouter: Router = Router();

authRouter.post('/register', registerValidation, register);

authRouter.post('/login', loginValidation, login);

authRouter.post('/logout', tokenValidation, logout);