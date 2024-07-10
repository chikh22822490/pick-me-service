import { EmailingService } from '@pick-me-core';
import { NodemailerEmailingService } from '@emailing-service';
import { Provider, Scope } from '@nestjs/common';

const EmailingServiceProvider: Provider<EmailingService> = {
  provide: 'EmailingService',
  useFactory: () => {
    return new NodemailerEmailingService(
      process.env.NODEMAILER_HOST,
      parseInt(process.env.NODEMAILER_PORT),
      process.env.NODEMAILER_USER,
      process.env.NODEMAILER_PASS
    );
  },
  scope: Scope.REQUEST,
};

export { EmailingServiceProvider };
