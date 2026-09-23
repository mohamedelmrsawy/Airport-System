import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { jwtTypeStaff } from '../types/jwtTypeStaff';
import { InjectRepository } from '@nestjs/typeorm';
import { Stuff } from '../staff/entities/staff.Entity';
import { Repository } from 'typeorm';
import { StuffEnum } from '../staff/staffEnum/staffEnum';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Stuff)
    private readonly stuffRepository: Repository<Stuff>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async stuffLogin(stuffJwt: jwtTypeStaff) {
    if (!stuffJwt || !stuffJwt.Name || !stuffJwt.Role) {
      console.log('Invalid JWT payload');
      throw new BadRequestException();
    }

    const { Name, Role } = stuffJwt;

    const roleEnum = Role as StuffEnum;

    const stuff = await this.stuffRepository.findOne({
      where: { Name: Name, Role: roleEnum },
    });

    if (!stuff) {
      console.log('WTF');
      throw new NotFoundException();
    }

    const payload = { Name: stuff.Name, Role: stuff.Role };

    const Bearer = await this.jwtService.signAsync(payload);

    return Bearer;
  }
}
