import { RequestHandler } from 'express';
import catchAsync from '../../utils/cathAsync';
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  // 
});

export const userController = {
  createUser,
};
