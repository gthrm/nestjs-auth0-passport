import { Request } from 'express';
import { Auth0Payload } from './auth0-payload.interface';

export interface RequestWithAuth0 extends Request {
  user: Auth0Payload;
}
