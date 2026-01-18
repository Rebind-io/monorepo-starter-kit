import jwt from 'jsonwebtoken';

import config from '../config';

// import { IJwtPayload } from '../interfaces/interface';

const generateToken = (payload: Record<string, unknown>) => {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET!);
};

export default generateToken;
