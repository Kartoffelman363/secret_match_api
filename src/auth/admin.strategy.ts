import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccessTokenPayload } from '../types/AccessTokenPayload';
import { AuthService } from './auth.service';
import { AdminAccessTokenPayload } from '../types/AdminAccessTokenPayload';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      //TODO env
      secretOrKey: 'aaaaaaaaaaa',
    });
  }

  async validate(
    payload: AdminAccessTokenPayload,
  ): Promise<AccessTokenPayload> {
    try {
      await this.authService.validateAdmin(payload.username);
    } catch {
      throw new UnauthorizedException();
    }
    return { email: payload.username };
  }
}
