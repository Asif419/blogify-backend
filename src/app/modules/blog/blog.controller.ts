import catchAsync from '../../utils/cathAsync';
import sendResponse from '../../utils/sendResponse';
import { blogServer } from './blog.service';
import httpStatus from 'http-status';

const createBlog = catchAsync(async (req, res) => {
  const result = await blogServer.createBlogIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

export const blogController = {
  createBlog,
};
