import { Request, Response, NextFunction } from 'express';
import {verifyToken} from "../utils/jwt";


export function protect(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token' });
    }


    const token = authHeader.split(' ')[1];
    try {
        const decoded = verifyToken(token) as { userId: number };
        req.user = decoded;

        next();
    } catch {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}
