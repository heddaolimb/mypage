import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Only allow POST
  }

  const { name, email, message } = req.body;

  // Konfigurer e-posttransport
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_TO, // din e-postadresse
      subject: `Kontakt fra ${name}`,
      text: message,
    });

    res.status(200).json({ message: "E-post sendt" });
  } catch (error) {
    res.status(500).json({ error: "Feil ved sending av e-post" });
  }
}
