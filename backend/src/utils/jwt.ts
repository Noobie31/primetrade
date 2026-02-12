import jwt from 'jsonwebtoken';
import { UserRole } from '../models/User.model';

export interface JwtPayload {
    userId: string;
    email: string;
    role: UserRole;
}

const JWT_SECRET: string = process.env.JWT_SECRET || 'fallback-secret-key-change-this';
const JWT_EXPIRE: string = process.env.JWT_EXPIRE || '7d';

export const generateToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRE
    } as jwt.SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

export const decodeToken = (token: string): JwtPayload | null => {
    try {
        return jwt.decode(token) as JwtPayload;
    } catch (error) {
        return null;
    }
};
