interface Data {
  SeatNumber: string;
  passenger: Passenger;
}

import { MailerService } from '@nestjs-modules/mailer';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Passenger } from '../../passenger/entities/passenger.Entity';

@Processor('sendEmail')
export class EmailWorker extends WorkerHost {
  constructor(private readonly mailerService: MailerService) {
    super();
  }

  async process(job: Job<Data>, token?: string) {
    if (job.name == 'email') {
      await this.mailerService.sendMail({
        from: 'user@gmail.com',
        to: job.data.passenger.email,
        subject: 'send Email',
        text: `SeatNumber: ${job.data.SeatNumber}`,
      });
    }
  }
}
