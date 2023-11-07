import { type RequestHandler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

type Options = Partial<Record<'body' | 'params' | 'query', z.AnyZodObject>>;

function validate<DTO extends z.AnyZodObject>(
  input: unknown,
  dto: DTO,
): Promise<z.infer<DTO>> {
  return dto.parseAsync(input);
}

export const validateMiddleware =
  (options: Options): RequestHandler =>
  async (request, response, next) => {
    try {
      if (options.body) {
        // eslint-disable-next-line require-atomic-updates
        request.body = await validate(request.body, options.body);
      }

      if (options.params) {
        // eslint-disable-next-line require-atomic-updates
        request.params = await validate(request.params, options.params);
      }

      if (options.query) {
        // eslint-disable-next-line require-atomic-updates
        request.query = await validate(request.query, options.query);
      }

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        response.status(StatusCodes.BAD_REQUEST).json({
          name: ReasonPhrases.BAD_REQUEST,
          statusCode: StatusCodes.BAD_REQUEST,
          message: validationError.message,
          details: validationError.details,
        });
      } else {
        next(error);
      }
    }
  };
