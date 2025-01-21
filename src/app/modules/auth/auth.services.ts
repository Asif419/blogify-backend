import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';

const registerUserIntoDB = async (payload: TUser) => {
  const userData: Partial<TUser> = payload;
  const email = userData.email;
  const password = userData.password;

  const newUser = await User.create(payload);
  return newUser;
};

export const authServices = {
  registerUserIntoDB,
};
