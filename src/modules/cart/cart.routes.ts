import { Router } from "express";

import {
    createCart,
    getCarts,
    deleteCart,
    updateCart,
} from "./cart.controller.js";

export const cartRouter: Router = Router();

cartRouter.get("/", getCarts);

cartRouter.post("/", createCart);

cartRouter.delete("/:id", deleteCart);

cartRouter.patch("/:id", updateCart);
