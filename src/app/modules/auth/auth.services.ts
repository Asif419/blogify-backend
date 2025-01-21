import config from '../../config';
import AppError from '../../error/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import { createToken } from './auth.utils';

const registerUserIntoDB = async (payload: TUser) => {
  const userData: Partial<TUser> = payload;
  const email = userData.email as string;
  const password = userData.password;

  const isUserExists = await User.UserExistenceCheckingByEmail(email);
  if (isUserExists) {
    throw new AppError(httpStatus.FORBIDDEN, 'Already have an account');
  }

  const newUser = await User.create(payload);
  return newUser;
};

const userLogIn = async (payload: TLoginUser) => {
  const isUserExists = await User.UserExistenceCheckingByEmail(payload.email);
  if (!isUserExists) {
    throw new AppError(httpStatus.FORBIDDEN, 'This User is not Found');
  }
  if (isUserExists?.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This User is Blocked');
  }
  if (
    !(await User.isPasswordMatched(payload.password, isUserExists.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  const jwtPayload = {
    userEmail: isUserExists.email,
    userRole: isUserExists.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const authServices = {
  registerUserIntoDB,
  userLogIn,
};
