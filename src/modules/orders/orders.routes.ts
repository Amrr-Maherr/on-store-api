import { Router } from 'express';

import { createOrder, getOrders, deleteOrder, updateOrder } from './orders.controller.js';

export const ordersRouter: Router = Router();

ordersRouter.get('/', getOrders);

ordersRouter.post('/', createOrder);

ordersRouter.delete('/:id', deleteOrder);

ordersRouter.patch('/:id', updateOrder);
