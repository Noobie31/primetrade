import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export interface ErrorResponse {
    success: false;
    message: string;
    errors?: any[];
    stack?: string;
}

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    _next: NextFunction
): void => {
    logger.error(`Error: ${err.message}`, {
        path: req.path,
        method: req.method,
        stack: err.stack
    });

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((e: any) => e.message);
        res.status(400).json({
            success: false,
            message: 'Validation error',
            errors
        });
        return;
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        res.status(400).json({
            success: false,
            message: `${field} already exists. Please use a different ${field}.`
        });
        return;
    }

    // Mongoose cast error (invalid ObjectId)
    if (err.name === 'CastError') {
        res.status(400).json({
            success: false,
            message: 'Invalid ID format'
        });
        return;
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
        return;
    }

    if (err.name === 'TokenExpiredError') {
        res.status(401).json({
            success: false,
            message: 'Token expired. Please login again.'
        });
        return;
    }

    // Default error
    const statusCode = err.statusCode || 500;
    const response: ErrorResponse = {
        success: false,
        message: err.message || 'Internal server error'
    };

    // Include stack trace in development
    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
    }

    res.status(statusCode).json(response);
};
