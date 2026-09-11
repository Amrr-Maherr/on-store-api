import { Router } from 'express';

import { createPayment, getPayments, deletePayment, updatePayment } from './payments.controller.js';

export const paymentsRouter: Router = Router();

paymentsRouter.get('/', getPayments);

paymentsRouter.post('/', createPayment);

paymentsRouter.delete('/:id', deletePayment);

paymentsRouter.patch('/:id', updatePayment);
