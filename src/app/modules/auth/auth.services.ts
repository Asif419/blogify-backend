import AppError from '../../error/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';

const registerUserIntoDB = async (payload: TUser) => {
  const userData: Partial<TUser> = payload;
  const email = userData.email;
  const password = userData.password;

  const newUser = await User.create(payload);
  return newUser;
};

const userLogIn = async (payload: TLoginUser) => {
  const isUserExists = await User.UserExistenceCheckingByEmail(payload.email);
  if (!isUserExists) {
    throw new AppError(httpStatus.FORBIDDEN, 'This User is not Found');
  }
  return {
    isUserExists,
  };
};

export const authServices = {
  registerUserIntoDB,
  userLogIn,
};
