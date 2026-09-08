import { Module, forwardRef } from '@nestjs/common';
import { StuffService } from './stuff.service';
import { StuffResolver } from './stuff.resolver';
import { Stuff } from './entity/stuffEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { FlightModule } from '../flight/flight.module';
import { StuffRoleGuard } from './guards/stuffRoleGuard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [StuffResolver, StuffService, StuffRoleGuard],
  imports: [
    TypeOrmModule.forFeature([Stuff]),
    AuthModule,
    forwardRef(() => FlightModule),
    JwtModule,
  ],
  exports: [StuffService, StuffRoleGuard, TypeOrmModule],
})
export class StuffModule {}
