import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';
import httpStatus from 'http-status';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = httpStatus.BAD_REQUEST;

  return {
    success: false,
    message: 'Invalid ID',
    statusCode,
    error: err?.message,
    stack: err?.stack,
  };
};

export default handleCastError;
