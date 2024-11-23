"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
// mailer/mailer.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
const sendMail = async (to, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Disipline" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
        });
        console.log("Message sent: %s", info.messageId);
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
};
exports.sendMail = sendMail;
