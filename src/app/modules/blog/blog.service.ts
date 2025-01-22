import { JwtPayload } from 'jsonwebtoken';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { TUser, TUserWithId } from '../user/user.interface';
import { User } from '../user/user.model';
import { Types } from 'mongoose';
import { title } from 'process';

const createBlogIntoDB = async (payload: TBlog, jwtPayload: JwtPayload) => {
  const userInformation = await User.UserExistenceCheckingByEmail(
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

const updateBlogIntoDB = async (payload: Partial<TBlog>, blogId: string) => {
  const result = await Blog.findByIdAndUpdate(
    { _id: blogId },
    { $set: payload },
    { new: true },
  );

  console.log(result);
  return null;
};

export const blogServer = {
  createBlogIntoDB,
  updateBlogIntoDB,
};
