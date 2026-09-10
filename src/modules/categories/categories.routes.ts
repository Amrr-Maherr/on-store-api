import { Router } from "express";

import {
    createCategory,
    getCategories,
    deleteCategory,
    updateCategory,
} from "./categories.controller.js";

export const categoriesRouter: Router = Router();

categoriesRouter.get("/", getCategories);

categoriesRouter.post("/", createCategory);

categoriesRouter.delete("/:id", deleteCategory);

categoriesRouter.patch("/:id", updateCategory);
