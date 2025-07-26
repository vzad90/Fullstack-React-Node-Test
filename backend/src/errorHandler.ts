import { NextFunction, Request, Response } from "express";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (res.headersSent) return next(err);


    if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
            return res.status(400).send({
                errors: [{ message: 'Item with this id does not exist' }],
            });
        }
        if (err.code === 'P2002') {
            return res.status(400).send({
                errors: [{ message: 'User with this email already exists' }],
            });
        }

        return res.status(400).send({
            errors: [{ message: err.message }],
        });
    }

    return res.status(500).send({
        errorss: [{ message: "Something went wrong" }],
    });
};
