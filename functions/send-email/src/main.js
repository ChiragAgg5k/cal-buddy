const mailgun = require('mailgun-js');

const emailConfig = {
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
};
const mg = mailgun(emailConfig);

const payload = JSON.parse(process.env.APPWRITE_FUNCTION_EVENT_DATA);
const name = payload['name'];
const email = payload['email'];

const data = {
  from: 'Welcome to My Awesome App <welcome@my-awesome-app.io>',
  to: email,
  subject: `Welcome on board ${name}!`,
  text: `Hi ${name}\nGreat to have you with us. ! 😍`,
};

mg.messages().send(data, function (error, body) {
  console.log(body);
});
