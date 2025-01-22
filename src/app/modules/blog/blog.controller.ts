import catchAsync from '../../utils/cathAsync';
import sendResponse from '../../utils/sendResponse';
import { blogServer } from './blog.service';
import httpStatus from 'http-status';

const createBlog = catchAsync(async (req, res) => {
  const result = await blogServer.createBlogIntoDB(req.body, req.user);

  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const blogId: string = req.params.id;
  const result = await blogServer.updateBlogIntoDB(req.body, blogId);

  sendResponse(res, {
    success: true,
    message: 'Updated content',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const blogController = {
  createBlog,
  updateBlog,
};
