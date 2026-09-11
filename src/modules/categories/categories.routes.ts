import { Router } from "express";

import {
    createCategory,
    getCategories,
    deleteCategory,
    updateCategory,
} from "./categories.controller.js";
import { updateCategoryValidation, createCategoryValidation, validateCategoryId } from "./categories.validation.js";
import { validateRequest } from "../../middlewares/validateRequest.js";

export const categoriesRouter: Router = Router();

categoriesRouter.get("/", getCategories);

categoriesRouter.post("/", createCategoryValidation, validateRequest, createCategory);

categoriesRouter.delete("/:id", validateCategoryId, validateRequest, deleteCategory);

categoriesRouter.patch("/:id", validateCategoryId, updateCategoryValidation, validateRequest, updateCategory);
