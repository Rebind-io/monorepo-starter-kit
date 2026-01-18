import bcrypt from 'bcrypt';

import AppError from './errorHandler/AppError';

const verifyPassword = async (password: string, hashedPassword: string) => {
  const matchedPassword = await bcrypt.compare(password, hashedPassword);

  if (!matchedPassword) {
    throw new AppError(400, 'Wrong Credentials!');
  }
};

export default verifyPassword;
