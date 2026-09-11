import { Router } from 'express';

import { createRating, getRatings, deleteRating, updateRating } from './ratings.controller.js';

export const ratingsRouter: Router = Router();

ratingsRouter.get('/', getRatings);

ratingsRouter.post('/', createRating);

ratingsRouter.delete('/:id', deleteRating);

ratingsRouter.patch('/:id', updateRating);
