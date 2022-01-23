import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ManagementClient } from 'auth0';
import { RequestWithAuth0 } from './interfaces/request.interface';

@Injectable()
export class AppService {
  public authZeroClient: ManagementClient;
  constructor(private readonly configService: ConfigService) {
    this.authZeroClient = new ManagementClient({
      domain: configService.get('AUTH0_DOMAIN'),
      clientId: configService.get('AUTH0_CLIENT_ID'),
      clientSecret: configService.get('AUTH0_CLIENT_SECRET'),
      scope: 'read:users update:users',
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  getSecretEndpoint(): string {
    return 'this endpoint should be protected';
  }

  async getProfile(req: RequestWithAuth0) {
    return this.authZeroClient.getUser({ id: req.user.sub });
  }
}
