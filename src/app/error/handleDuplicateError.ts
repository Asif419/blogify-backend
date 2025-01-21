import { TGenericErrorResponse } from '../interface/error';
import httpStatus from 'http-status';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const statusCode = httpStatus.BAD_REQUEST;

  return {
    success: false,
    message: 'Invalid ID',
    statusCode,
    error: `${extractedMessage} is already exists`,
    stack: err?.stack,
  };
};
