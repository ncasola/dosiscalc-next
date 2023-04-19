import mongoose from 'mongoose'
import { compare, hash } from 'bcryptjs';
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);


/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
 UserSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return compare(password, user.password);
};

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */

export default mongoose.models.User || mongoose.model('User', UserSchema);