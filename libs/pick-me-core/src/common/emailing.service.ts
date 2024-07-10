export interface EmailingService {
  sendEmail(mail: MailTemplate);
}

export type MailTemplate = {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
};
