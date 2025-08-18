import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Only allow POST
  }

  const { name, email, message } = req.body;

  // Gmail transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // 1️⃣ Send til deg selv
    const info = await transporter.sendMail({
      from: `"Hedda Olimb" <${process.env.EMAIL_USER}>`, // ✅ profesjonell avsender
      replyTo: email,
      to: process.env.EMAIL_TO,
      subject: `Kontakt fra ${name}`,
      html: `
        <h2>Ny melding fra kontaktskjemaet</h2>
        <p><strong>Navn:</strong> ${name}</p>
        <p><strong>E-post:</strong> ${email}</p>
        <p><strong>Melding:</strong></p>
        <p style="white-space: pre-line;">${message}</p>
      `,
    });

    console.log("Message sent to you: %s", info.messageId);

    // 2️⃣ Bekreftelse til avsenderen
    const confirm = await transporter.sendMail({
      from: `"Hedda Olimb" <${process.env.EMAIL_USER}>`, // ✅ ser ut som vanlig mail fra deg
      to: email,
      subject: "Takk for at du tok kontakt",
      html: `
        <h2>Hei ${name},</h2>
        <p>Takk for at du kontaktet meg. Jeg har mottatt meldingen din og kommer tilbake til deg så snart jeg kan.</p>
        
        <p><strong>Kopi av meldingen din:</strong></p>
        <blockquote style="border-left: 4px solid #ddd; margin: 1em 0; padding-left: 1em; color: #555;">
          ${message}
        </blockquote>
        
        <p>Vennlig hilsen,<br/>Hedda Olimb</p>
      `,
    });

    console.log("Confirmation sent: %s", confirm.messageId);

    res.status(200).json({ message: "E-post sendt og bekreftelse levert" });
  } catch (error) {
    console.error("Nodemailer error:", error);
    res.status(500).json({ error: "Feil ved sending av e-post" });
  }
}
