import { Request } from 'express';

export interface AuthRequest extends Request {
  user: {
    sub: string;
    username: string;
    role: string;
  };
}
