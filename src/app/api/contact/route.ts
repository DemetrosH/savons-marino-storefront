import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // Check if credentials exist
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error("Contact API Error: SMTP credentials missing in environment variables.");
      return NextResponse.json({ error: "Le serveur n'est pas configuré pour envoyer des emails." }, { status: 500 });
    }

    // Clean password (remove spaces)
    const cleanPass = process.env.SMTP_PASSWORD.replace(/\s/g, "");

    // Create a transporter using Gmail SMTP (SSL on port 465)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: cleanPass,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: "savonsmarino@gmail.com",
      replyTo: email,
      subject: `[Contact Form] ${subject}: ${name}`,
      text: `
        Nom: ${name}
        Email: ${email}
        Sujet: ${subject}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #9f9a85; border-bottom: 2px solid #9f9a85; padding-bottom: 10px;">Nouveau message de contact</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Sujet :</strong> ${subject}</p>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 4px; margin-top: 20px;">
            <p><strong>Message :</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
            Ce message a été envoyé via le formulaire de contact de Savons Marino.
          </p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ 
      error: "Une erreur technique est survenue lors de l'envoi du mail.",
      details: error.message 
    }, { status: 500 });
  }
}
