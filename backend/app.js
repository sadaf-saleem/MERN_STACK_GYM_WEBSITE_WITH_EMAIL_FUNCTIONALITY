import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js";

const app = express();

// dotenv config
config({ path: "./config.env" });

// middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTE
app.post("/send/mail", async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide all details",
    });
  }

  try {
    await sendEmail({
      email: "abc45918700@gmail.com", // receiver email
      subject: "GYM WEBSITE CONTACT",
      message: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      userEmail: email,
    });

    res.status(200).json({
      success: true,
      message: "Message Sent Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// server start
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
