import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stuff } from '../stuff/entity/stuffEntity';
import { MaliModule } from '../mailer/mailer.module';

@Module({
  exports: [AuthService],
  providers: [AuthResolver, AuthService],
  imports: [
    MaliModule,
    TypeOrmModule.forFeature([Stuff]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          global: true,
          expireIn: config.get<string>('JWT_EXPIRES_IN'),
        };
      },
    }),
  ],
})
export class AuthModule {}
