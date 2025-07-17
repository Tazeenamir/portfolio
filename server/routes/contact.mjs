import express from "express"
import nodemailer from "nodemailer"

const router = express.Router()

router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" })
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "tazeenamir969@gmail.com",
    subject: `Portfolio Contact: ${subject}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
    replyTo: email,
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({ message: "Email sent successfully" })
  } catch (error) {
    console.error("Email send error:", error)
    res.status(500).json({ error: "Failed to send email" })
  }
})

export default router
