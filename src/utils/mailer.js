const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "davidazp9@gmail.com",
        pass: process.env.G_PASSWORD,
    }
});

module.exports = transporter;