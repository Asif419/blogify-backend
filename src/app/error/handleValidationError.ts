import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';
import httpStatus from 'http-status';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
    
  const statusCode = httpStatus.BAD_REQUEST;
  const error: string = Object.values(err.errors)
    .map(
      (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) =>
        val?.message,
    )
    .join(', ');

  return {
    success: false,
    message: 'Invalid ID',
    statusCode,
    error,
    stack: err?.stack,
  };
};

export default handleValidationError;
