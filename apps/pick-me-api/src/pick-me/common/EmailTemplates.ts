import { MailTemplate } from '@pick-me-core';

function emailTemplate(content: string) {
  return `
  <!DOCTYPE html>
  <html lang="fr"> 
  <head>
  <title>pick-me Metrics</title>
  <style> 
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap");
    @media only screen and (max-width: 600px) {
        .container {
            width: 100% !important;
            padding: 10px !important;
        }

        .footer-table,
        .footer-table td {
            width: 100% !important;
            display: block !important;
            text-align: center !important;
        }

        .footer-table td {
            display: block;
            text-align: center;
            padding: 5px 0;
        }
    }

    </style>
    </head>
    <body style="font-family: 'Open Sans', sans-serif; line-height: 1.6;">
    <table class="container" style="width: 80%; margin: 0 auto; background: #f4f4f4; padding: 20px; border-spacing: 0;">
      <tr>
        <td class="header" style="background: #d2ba92; color: #fff; padding: 10px; text-align: center;">
          <img alt="Logo pick-me Metrics" src="${process.env.USER_POST_REGISTRATION_REDIRECT_URI}/pick-me-logo.png" style="margin: auto; width: 80%; height: auto;" />
        </td>
      </tr>
      <tr>
        <td class="content" style="padding: 20px; text-align: left;">
          <p>${content}</p>
        </td>
      </tr>
      <tr>
        <td class="footer" style="background: #d2ba92; color: #00728a; text-align: center; padding: 10px;">
          <table class="footer-table" style="width: 100%; border-spacing: 0;">
            <tr>
              <td style="text-align: left;">
                <a href="mailto:contact@groupe-pick-me.com" style="text-decoration: none; color: #00728a;">contact@groupe-pick-me.com </a>
              </td>
              <td style="text-align: right; color: #00728a;">&copy; 2023 Groupe pick-me. Tous droits réservés </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
    </html>`;
}

export function documentUploadEmailTemplate(
  investorDisplayName: string,
  documentSsender: string,
  recieverEmailAdress: string,
  uploadDate: Date,
  documentName: string,
  documentCategory: string
): MailTemplate {
  const mailContent = `
    <p>
      Un nouveau document est ajouté au coffre-fort de "${investorDisplayName}".
    </p>
    <p>Expéditeur: ${documentSsender}</p>
    <p>
      Date: ${uploadDate.getDate()}/${
    uploadDate.getMonth() + 1
  }/${uploadDate.getFullYear()}
    </p>
    <p>Nom du document: ${documentName}</p>
    <p>Catgeory: ${documentCategory}</p>
    <a href="${
      process.env.USER_POST_REGISTRATION_REDIRECT_URI
    }">Lien vers le portail pick-me Metrics</a>
  `;
  const mail = {
    from: `"pick-me Metrics" ${process.env.NODEMAILER_USER}`,
    to: recieverEmailAdress,
    subject: 'Documment ajouté au coffre-fort',
    text: mailContent,
    html: emailTemplate(mailContent),
  };

  return mail;
}
