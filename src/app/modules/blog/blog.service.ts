import { JwtPayload } from 'jsonwebtoken';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { TUser, TUserWithId } from '../user/user.interface';
import { User } from '../user/user.model';
import { Types } from 'mongoose';
import { title } from 'process';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';

const createBlogIntoDB = async (payload: TBlog, jwtPayload: JwtPayload) => {
  const userInformation = await User.userExistenceCheckingByEmail(
    jwtPayload.userEmail,
  );

  const convertedUserIDToString: string = new Types.ObjectId(
    userInformation._id,
  ).toString();

  const blogData = { ...payload, author: convertedUserIDToString };
  const createdBlog = await Blog.create(blogData);
  const result = await Blog.findById(createdBlog._id)
    .select('-isPublished')
    .populate({
      path: 'author',
      select: 'name email',
    });

  return result;
};

const updateBlogIntoDB = async (payload: Partial<TBlog>, id: string) => {
  const isBlogExist = await Blog.isBlogExistsById(id);
  if (!isBlogExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'The blog is not found');
  }

  const result = await Blog.findByIdAndUpdate(
    { _id: id },
    { $set: payload },
    { new: true },
  )
    .select('-isPublished')
    .populate({
      path: 'author',
      select: 'name email',
    });

  return result;
};

const deleteBlogFromDB = async (id: string) => {

  // const result = await Blog.deleteOne({ _id: id });
  // console.log(result);
  return null;
};

export const blogServer = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
