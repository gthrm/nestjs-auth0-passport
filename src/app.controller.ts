import {
  Controller,
  Get,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { User } from 'auth0';
import { RequestWithAuth0 } from './interfaces/request.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('public')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('secret')
  @UseGuards(AuthGuard('jwt'))
  secretEndpoint() {
    return this.appService.getSecretEndpoint();
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async profile(
    @Request()
    req: RequestWithAuth0,
  ): Promise<User> {
    try {
      const user = await this.appService.getProfile(req);
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
