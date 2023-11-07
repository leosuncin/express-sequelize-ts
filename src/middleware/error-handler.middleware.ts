import { type ErrorRequestHandler } from 'express';
import createHttpError from 'http-errors';
import { getReasonPhrase, ReasonPhrases, StatusCodes } from 'http-status-codes';

export const errorHandlerMiddleware: ErrorRequestHandler = (
  error: unknown,
  request,
  response,
  next,
) => {
  if (!error) {
    next();
    return;
  }

  request.log.error(error, '(ノಠ益ಠ)ノ彡┻━┻');

  if (createHttpError.isHttpError(error)) {
    response.status(error.statusCode).json({
      name: getReasonPhrase(error.statusCode),
      statusCode: error.statusCode,
      message: error.message,
    });
    return;
  }

  response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    name: ReasonPhrases.INTERNAL_SERVER_ERROR,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: error instanceof Error ? error.message : String(error),
  });
};
