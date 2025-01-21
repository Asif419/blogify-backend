import { RequestHandler } from 'express';
import catchAsync from '../../utils/cathAsync';
import { authServices } from './auth.services';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await authServices.registerUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registration successful',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

export const authControllers = {
  createUser,
};
