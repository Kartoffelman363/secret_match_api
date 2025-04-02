import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccessTokenPayload } from '../types/AccessTokenPayload';
import { AuthService } from './auth.service';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'aaaaaaaaaaa',
    });
  }

  async validate(payload: AccessTokenPayload): Promise<AccessTokenPayload> {
    try {
      await this.authService.validateAdmin(payload.username);
    } catch {
      throw new UnauthorizedException();
    }
    return { username: payload.username };
  }
}
