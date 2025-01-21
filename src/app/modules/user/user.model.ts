import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';

const userSchema = new Schema<TUser, UserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: 0 },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  isBlocked: { type: Boolean, default: false },
});

userSchema.statics.UserExistenceCheckingByEmail = async function (
  email: string,
) {
  return await User.findOne({ email });
};

export const User = model<TUser, UserModel>('User', userSchema);
