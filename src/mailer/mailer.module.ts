import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (confg: ConfigService) => {
        return {
          transport: {
            host: confg.get<string>('SMTP_HOST'),
            port: confg.get<number>('SMTP_PORT'),
            secure: false,
            auth: {
              user: confg.get<string>('SMYP_USERNAME'),
              pass: confg.get<string>('SMYP_PASSWORD'),
            },
          },
        };
      },
    }),
  ],
})
export class MaliModule {}
