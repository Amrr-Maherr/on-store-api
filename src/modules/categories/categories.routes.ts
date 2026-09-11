import { Router } from "express";

import {
    createCategory,
    getCategories,
    deleteCategory,
    updateCategory,
} from "./categories.controller.js";
import { updateCategoryValidation, createCategoryValidation, validateCategoryId } from "./categories.validation.js";

export const categoriesRouter: Router = Router();

categoriesRouter.get("/", getCategories);

categoriesRouter.post("/", createCategoryValidation, createCategory);

categoriesRouter.delete("/:id", validateCategoryId, deleteCategory);

categoriesRouter.patch("/:id", validateCategoryId, updateCategoryValidation, updateCategory);
