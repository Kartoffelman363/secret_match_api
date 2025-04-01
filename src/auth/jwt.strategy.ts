import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { AccessTokenPayload } from '../types/AccessTokenPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      //TODO env
      secretOrKey: 'aaaaaaaaaaa',
    });
  }

  validate(payload: AccessTokenPayload): AccessTokenPayload {
    return { email: payload.email };
  }
}
