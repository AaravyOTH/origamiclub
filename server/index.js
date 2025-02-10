const express = require('express');
const nodeMailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 9000;

const myemail = process.env.EMAIL;
const mypassword = process.env.PASSWORD;

// Use CORS middleware
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Email sending function
function sendEmail({ receiver_email, subject, message }) {
  return new Promise((resolve, reject) => {
    var transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: myemail,
        pass: mypassword,
      },
    });

    const mailOptions = {
      from: myemail,
      to: receiver_email,
      subject: subject,
      text: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: 'an error occurred' });
      } else {
        return resolve({ message: 'email sent' });
      }
    });
  });
}

// Route to handle email sending
app.post("/send_email", (req, res) => {
  const { receiver_email, subject, message } = req.body;
  if (!receiver_email || !subject || !message) {
    return res.status(400).send("All fields are required");
  }
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
