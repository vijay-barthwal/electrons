import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = { name: 100, email: 150, phone: 30, interest: 60, message: 2000 };

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, MAX_LEN.name);
  const email = String(body.email ?? "").trim().slice(0, MAX_LEN.email);
  const phone = String(body.phone ?? "").trim().slice(0, MAX_LEN.phone);
  const interest = String(body.interest ?? "").trim().slice(0, MAX_LEN.interest);
  const message = String(body.message ?? "").trim().slice(0, MAX_LEN.message);
  // Honeypot: real users never fill this hidden field.
  const company = String(body.company ?? "").trim();

  if (company) {
    return NextResponse.json({ success: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { success: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
  const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || SMTP_USER;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    console.error("Contact form: SMTP_HOST / SMTP_USER / SMTP_PASSWORD env vars are not set.");
    return NextResponse.json(
      { success: false, error: "The contact form is not configured yet. Please call or WhatsApp us directly." },
      { status: 500 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // true for port 465 (implicit TLS), false for 587 (STARTTLS)
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    });

    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      phone: escapeHtml(phone),
      interest: escapeHtml(interest),
      message: escapeHtml(message).replace(/\n/g, "<br />"),
    };

    await transporter.sendMail({
      from: `"Website Contact Form" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New inquiry from ${name}${interest ? ` — ${interest}` : ""}`,
      text: [
        `New website inquiry`,
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        interest ? `Interested in: ${interest}` : null,
        ``,
        message,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <div style="font-family:sans-serif;font-size:15px;color:#111;line-height:1.6">
          <h2 style="margin:0 0 12px">New website inquiry</h2>
          <p><strong>Name:</strong> ${safe.name}</p>
          <p><strong>Email:</strong> ${safe.email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${safe.phone}</p>` : ""}
          ${interest ? `<p><strong>Interested in:</strong> ${safe.interest}</p>` : ""}
          <p><strong>Message:</strong><br />${safe.message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form send error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong sending your message. Please try again later." },
      { status: 500 }
    );
  }
}
