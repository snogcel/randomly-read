const nodemailer = require('nodemailer');

exports.notify = (email, username) => {

  const transporter = nodemailer.createTransport({
    port: 25,
    host: 'localhost',
    tls: {
      rejectUnauthorized: false
    },
  });

  let message = {
    from: 'admin@blackcircletechnologies.com',
    to: 'jon@blackcircletechnologies.com',
    subject: 'Randomly Read Registration Alert',
    text: 'New user: ' + username + ' using ' + email,
    html: '<p>New user: ' + username + ' using ' + email + '</p>'
  };

  console.log(message);

  transporter.sendMail(message, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });

};
