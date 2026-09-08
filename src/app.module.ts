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
import { StuffModule } from './stuff/stuff.module';
import { BagModule } from './bag/bag.module';
import { AirportModule } from './airport/airport.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { MaliModule } from './mailer/mailer.module';

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
          synchronize: true,
        };
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      graphiql: true,
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    FlightModule,
    PassengerModule,
    BookModule,
    StuffModule,
    BagModule,
    AirportModule,
    AuthModule,
    MaliModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
