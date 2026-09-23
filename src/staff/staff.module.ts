import { Module, forwardRef } from '@nestjs/common';
import { StuffService } from './staff.service';
import { StuffResolver } from './staff.resolver';
import { Stuff } from './entities/staff.Entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { FlightModule } from '../flight/flight.module';
import { StuffRoleGuard } from './guards/staffRoleGuard';
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
