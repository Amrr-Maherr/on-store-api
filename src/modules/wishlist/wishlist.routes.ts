import { Router } from "express";

import {
    createWishlist,
    getWishlists,
    deleteWishlist,
    updateWishlist,
} from "./wishlist.controller.js";

export const wishlistRouter: Router = Router();

wishlistRouter.get("/", getWishlists);

wishlistRouter.post("/", createWishlist);

wishlistRouter.delete("/:id", deleteWishlist);

wishlistRouter.patch("/:id", updateWishlist);
