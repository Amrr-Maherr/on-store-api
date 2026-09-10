import { Router } from "express";

import {
    createCoupon,
    getCoupons,
    deleteCoupon,
    updateCoupon,
} from "./coupons.controller.js";

export const couponsRouter: Router = Router();

couponsRouter.get("/", getCoupons);

couponsRouter.post("/", createCoupon);

couponsRouter.delete("/:id", deleteCoupon);

couponsRouter.patch("/:id", updateCoupon);
