const nodemailer = require('nodemailer');

const parts = process.env.DECODED_PARTS * 1
const sender = process.env.SMS_1_NUMBER
let message = ''

if (parts == 0) {
    message = process.env.SMS_1_TEXT;
}
else {
    for (let i = 0; i < parts; i++) {
        message += process.env[`DECODED_${i + 1}_TEXT`]
    }
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'USERNAME@gmail.com',
    pass: 'PASSWORD'
  }
});


const mailOptions = {
  from: '"📱 Raspberry Pi"<send@email.com>',
  to: 'delivery@email.com',
  subject: `✉️ ${sender}`,
  text: message,
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
	console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});