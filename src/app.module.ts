import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { FlightModule } from './flight/flight.module';
import { PassengerModule } from './passenger/passenger.module';
import { BookModule } from './book/book.module';
import { StuffModule } from './staff/staff.module';
import { BagModule } from './bag/bag.module';
import { AirportModule } from './airport/airport.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { MaliModule } from './mailer/mailer.module';
import { SeatModule } from './seat/seat.module';
import { StuffService } from './staff/staff.service';
import { Request } from 'express';
import { Context } from 'graphql-ws';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { StuffJwtType } from './types/stuffJwtType';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          database: config.get<string>('NAME'),
          username: 'postgres',
          password: config.get<string>('PASSWORD'),
          port: config.get<number>('PORT'),
          host: config.get<string>('HOST'),
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [StuffModule, ConfigModule, JwtModule],
      inject: [StuffService, JwtService, ConfigService],
      useFactory: (
        stuffService: StuffService,
        jwtService: JwtService,
        configService: ConfigService,
      ) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        graphiql: true,
        context: ({
          req,
          connectionParams,
        }: {
          req: Request;
          connectionParams: string;
        }) => ({
          req,
          connectionParams,
          stuffLoader: stuffService.stuffDataLoader(),
        }),
        subscriptions: {
          'graphql-ws': {
            onConnect: async (context: Context<any>) => {
              const { connectionParams } = context;
              const authToken = connectionParams?.Bearer as string;
              if (!authToken) {
                throw new Error('Token is not valid');
              }

              try {
                const payload: StuffJwtType = await jwtService.verifyAsync(
                  authToken,
                  {
                    secret: configService.get<string>('JWT_SECRET'),
                  },
                );
                console.log('Authenticated user:', payload);
                return { extra: payload };
              } catch (err) {
                throw new Error(`${err}`);
              }
            },
          },
        },
      }),
    }),
    BullModule.forRoot({
      connection: { host: 'localhost', port: 6379 },
      defaultJobOptions: { attempts: 2, delay: 2000 },
    }),
    BullModule.registerQueue({ name: 'sendEmail' }),
    FlightModule,
    PassengerModule,
    BookModule,
    StuffModule,
    BagModule,
    AirportModule,
    AuthModule,
    MaliModule,
    SeatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
