import { NextFunction, Request, Response } from 'express';
import { ZodAny } from 'zod';

const validateRequest = (schema: ZodAny) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
