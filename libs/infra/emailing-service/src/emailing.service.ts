import { EmailingService, MailTemplate } from '@pick-me-core';
import nodemailer = require('nodemailer');

export class NodemailerEmailingService implements EmailingService {
  private _transporter: nodemailer.Transporter;
  constructor(host: string, port: number, user: string, password: string) {
    this._transporter = nodemailer.createTransport({
      host: host,
      port: port,
      auth: {
        user: user,
        pass: password,
      },
    });
  }

  async sendEmail(mail: MailTemplate) {
    try {
      await this._transporter.sendMail(mail);
    } catch (error) {
      throw new Error(error);
    }
  }
}
