import catchAsync from '../utils/cathAsync';
import { User } from '../modules/user/user.model';
import AppError from '../error/AppError';
import httpStatus from 'http-status';
import { Blog } from '../modules/blog/blog.model';

const verifyOwnership = catchAsync(async (req, res, next) => {
  const blogId = req.params.id;
  const userEmail = req.user.userEmail;

  const BlogDataFromDB = await Blog.isBlogExistsById(blogId);
  if (!BlogDataFromDB) {
    throw new AppError(httpStatus.NOT_FOUND, 'The blog is not found');
  }

  const userDataFromDB = await User.userExistenceCheckingByEmail(userEmail);
  if (!userDataFromDB) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'The user is not found');
  }

  if (!BlogDataFromDB.author.equals(userDataFromDB._id)) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Unauthorized: You are not the owner of this blog',
    );
  }

  next();
});

export default verifyOwnership;
