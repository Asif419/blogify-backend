import { ZodError, ZodIssue } from 'zod';
import { TGenericErrorResponse } from '../interface/error';
import config from '../config';
import httpStatus from 'http-status';


const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const error: string = err.issues
    .map((issue: ZodIssue) => issue.message)
    .join();

  const statusCode = httpStatus.BAD_REQUEST;

  return {
    success: false,
    statusCode,
    message: 'Validation error',
    error,
    stack: err?.stack,
  };
};

export default handleZodError;
