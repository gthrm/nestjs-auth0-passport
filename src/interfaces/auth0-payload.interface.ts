export interface Auth0Payload {
  sub: string;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  azp: string;
  gty: string;
}
