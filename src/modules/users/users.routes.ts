import { Router } from "express";

import {
    createUser,
    getUsers,
    deleteUser,
    updateUser,
} from "./users.controller.js";

export const usersRouter: Router = Router();

usersRouter.get("/", getUsers);

usersRouter.post("/", createUser);

usersRouter.delete("/:id", deleteUser);

usersRouter.patch("/:id", updateUser);
