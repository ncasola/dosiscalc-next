const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
    host: 'api.eu.mailgun.net',
  }

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

export default nodemailerMailgun;
  