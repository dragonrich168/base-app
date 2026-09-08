import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import type { ZodSchema } from '../types/http';
import { ApiError } from '../errors/ApiError';

interface ValidateOptions {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

/**
 * Factory that returns middleware validating the request body, query and/or
 * route params against the provided zod schemas. Parsed values are written
 * back onto the request so handlers receive clean, typed data.
 */
export function validate(options: ValidateOptions) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (options.body) {
        req.body = options.body.parse(req.body);
        (req as unknown as { validatedBody: unknown }).validatedBody = req.body;
      }
      if (options.query) {
        req.query = options.query.parse(req.query);
        (req as unknown as { validatedQuery: unknown }).validatedQuery = req.query;
      }
      if (options.params) {
        const parsed = options.params.parse(req.params);
        Object.assign(req.params, parsed);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(ApiError.badRequest('Validation failed', error.issues.map(formatIssue)));
        return;
      }
      next(error);
    }
  };
}

function formatIssue(issue: { path: PropertyKey[]; message: string }): {
  field: string;
  message: string;
} {
  return { field: issue.path.join('.'), message: issue.message };
}
