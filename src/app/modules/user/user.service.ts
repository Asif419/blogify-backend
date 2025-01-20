import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const userData: Partial<TUser> = payload;
  const email = userData.email;
  const password = userData.password;

  const newUser = await User.create(payload);
  return newUser;
};

export const userServices = {
  createUserIntoDB,
};
