import { Injectable } from '@nestjs/common';
import { StuffJwtType } from '../types/stuffJwtType';
import { InjectRepository } from '@nestjs/typeorm';
import { Stuff } from '../stuff/entity/stuffEntity';
import { Repository } from 'typeorm';
import { StuffEnum } from '../stuff/stuffEnum/stuffEnum';
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

  async stuffLogin(stuffJwt: StuffJwtType) {
    if (!stuffJwt || !stuffJwt.Name || !stuffJwt.role) {
      throw new Error('Invalid JWT payload');
    }

    const { Name, role } = stuffJwt;

    const roleEnum = role as StuffEnum;

    const stuff = await this.stuffRepository.findOne({
      where: { Name, Role: roleEnum },
    });

    if (!stuff) {
      throw new Error('Stuff not found');
    }

    const payload = { Name: stuff.Name, Role: stuff.Role };

    try {
      await this.mailerService.sendMail({
        from: 'mohamed@gmail.com',
        to: 'ali@gmail.com',
        subject: 'login success',
      });
    } catch (error) {
      console.log(error);
    }

    return await this.jwtService.signAsync(payload);
  }
}
