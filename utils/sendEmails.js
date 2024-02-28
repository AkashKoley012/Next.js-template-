import nodemailer from "nodemailer";
import { google } from "googleapis";
const { OAuth2 } = google.auth;
import { activateEmailTemplate } from "@/emails/activateEmailTemplate";
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  MAIL_SERVICE_CLIENT_ID,
  MAIL_SERVICE_CLIENT_SECRET,
  MAIL_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
  MAIL_SERVICE_CLIENT_ID,
  MAIL_SERVICE_CLIENT_SECRET,
  MAIL_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

// Send email
export const sendEmail = (to, url, txt, subject) => {
  oauth2Client.setCredentials({
    refresh_token: MAIL_SERVICE_REFRESH_TOKEN,
  });
  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAUTH2",
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAIL_SERVICE_CLIENT_ID,
      clientSecret: MAIL_SERVICE_CLIENT_SECRET,
      refreshToken: MAIL_SERVICE_REFRESH_TOKEN,
      accessToken,
    },
  });
  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: subject,
    html: activateEmailTemplate(to, url),
  };
  smtpTransport.sendMail(mailOptions, (err, infos) => {
    if (err) return err;
    return infos;
  });
};
