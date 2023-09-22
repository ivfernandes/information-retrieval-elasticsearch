import { Request, Response, NextFunction } from 'express';
import { Exception } from '../exceptions/exception';

const error = (err: Error) => {
  if (err instanceof Exception) {
    return err;
  }
  return new Exception(err.message, 500);
};

export default function errorHandlerMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const exception = error(err);
  res.status(exception.status).json({
    message: exception.message,
    status: exception.status,
    name: exception.name,
  });
}
