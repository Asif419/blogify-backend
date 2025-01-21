/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { Model } from 'mongoose';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
}

export interface UserModel extends Model<TUser> {
  UserExistenceCheckingByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<Boolean>;
}
