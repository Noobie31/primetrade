import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '../utils/jwt';
import logger from '../utils/logger';

export interface AuthRequest extends Request {
    user?: JwtPayload;
}

export const authenticate = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                message: 'No token provided. Authorization denied.'
            });
            return;
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = verifyToken(token);

        // Attach user to request
        req.user = decoded;

        next();
    } catch (error: any) {
        logger.error(`Authentication error: ${error.message}`);
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token. Please login again.'
        });
    }
};
