import { type RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

export const notFoundRouteMiddleware: RequestHandler = (
  request,
  _response,
  next,
) => {
  next(
    createHttpError(
      StatusCodes.NOT_FOUND,
      `Cannot ${request.method} ${request.url}`,
    ),
  );
};
