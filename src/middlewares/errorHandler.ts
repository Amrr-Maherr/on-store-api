import { type NextFunction, type Request, type Response } from 'express';

type AppError = Error & {
    statusCode?: number;
    status?: string;
};

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        status: statusCode >= 500 ? 'error' : 'fail',
        message: err.message || 'Internal Server Error',
    });
};