import { RequestHandler } from 'express';
import catchAsync from '../../utils/cathAsync';
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registration successful',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

export const userController = {
  createUser,
};
