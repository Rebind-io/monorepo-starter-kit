import config from '@config';
import jwt, { SignOptions } from 'jsonwebtoken';

import AppError from './errorHandler/AppError';

class AuthToken {
  expiresIn: SignOptions['expiresIn'] = '1h'; // Token expiration time

  /**
   * Generates a JWT token with the given payload.
   * @param payload
   * @returns  A promise that resolves to the generated token.
   */
  async generate(payload: Record<string, unknown>) {
    return jwt.sign(payload, config.JWT_ACCESS_SECRET!, {
      expiresIn: this.expiresIn,
    });
  }

  /**
   * Verifies the given JWT token.
   * @param token s
   * @returns The decoded token payload if the token is valid.
   * @throws An AppError if the token is invalid.
   */
  async verify(token: string) {
    try {
      return jwt.verify(token, config.JWT_ACCESS_SECRET!);
    } catch (error) {
      throw new AppError(401, 'Invalid token', 'Unauthorized');
    }
  }
}

const authToken = new AuthToken();
export default authToken;
