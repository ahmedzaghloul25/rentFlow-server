import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: 'https://rentflow-client.vercel.app/auth/google-redirect',
      scope: ['email', 'profile'],
      passReqToCallback: true
    });
  }


  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      isVerified: emails[0].verified,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
    };
    return user;
  }
}