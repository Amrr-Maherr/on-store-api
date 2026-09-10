import { Router } from "express";

import {
    createReview,
    getReviews,
    deleteReview,
    updateReview,
} from "./reviews.controller.js";

export const reviewsRouter: Router = Router();

reviewsRouter.get("/", getReviews);

reviewsRouter.post("/", createReview);

reviewsRouter.delete("/:id", deleteReview);

reviewsRouter.patch("/:id", updateReview);
