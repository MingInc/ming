import nodemailer from "nodemailer";
import { GmailAppPassword } from "../constants";

/**
 * Sends support ticket emails to both the user and the admin.
 *
 * This function sends two emails:
 * 1. A confirmation email to the user who raised the support ticket,
 *    notifying them that their ticket has been received and assigned.
 * 2. A notification email to the admin about the new support ticket raised.
 *
 * @param {string} [userEmail] - The email address of the user who raised the support ticket.
 * @param {string} [adminEmail] - The email address of the admin to notify about the new support ticket.
 * @param {string} [title] - The title of the support ticket.
 * @param {string} [description] - A description of the issue provided by the user.
 * @param {string} [assignedTo] - The person to whom the ticket has been assigned.
 *
 * @returns {Promise<void>} - Resolves if both emails are sent successfully,
 *                             rejects if an error occurs during email sending.
 */
export async function sendSupportEmails(
  userEmail?: string,
  adminEmail?: string,
  title?: string,
  description?: string,
  assignedTo?: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Use your email provider (e.g., Gmail, SendGrid, etc.)
    port: 465,
    secure: true,
    auth: {
      user: "eriag321@gmail.com", // Your email address
      pass: GmailAppPassword,
    },
  });

  // Email to User
  const userMailOptions = {
    from: "eriag321@gmail.com", // Your email address
    to: userEmail,
    subject: "Support Ticket Received",
    text: `Hello, \n\nYour support ticket titled "${title}" has been received. Our team is currently reviewing it and has assigned it to ${assignedTo}.\n\nTicket Description: ${description}\n\nThank you for reaching out to us!`,
  };

  // Email to Admin
  const adminMailOptions = {
    from: "eriag321@gmail.com",
    to: adminEmail,
    subject: "New Support Ticket Raised",
    text: `Hello Admin, \n\nA new support ticket has been raised by a user ${userEmail}.\n\nTitle: ${title}\nDescription: ${description}\n\nPlease review and respond accordingly.`,
  };

  try {
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);
    console.log("Emails sent successfully to both user and admin.");
  } catch (error) {
    console.error("Error sending emails:", error);
  }
}

/**
 * Sends a welcome email to the specified user.
 *
 * This function sends a personalized welcome email to a new user, including information about the platform,
 * how to get started, and support resources.
 *
 * @param {string | null} userEmail - The email address of the user to send the welcome email to.
 * If the email is null or undefined, the function will log an error and exit early.
 *
 * @returns {Promise<void>} - Resolves if the email is sent successfully, or logs an error if something goes wrong.
 */
export async function sendWelcomeEmail(
  userEmail: string | null
): Promise<void> {
  if (!userEmail) {
    console.error("User email is required for sending the welcome email");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Use your email provider (e.g., Gmail, SendGrid, etc.)
    port: 465,
    secure: true,
    auth: {
      user: "eriag321@gmail.com", // Your email address
      pass: GmailAppPassword, // Your email password or app-specific password
    },
  });

  const userMailOptions = {
    from: "eriag321@gmail.com", // Your email address
    to: userEmail,
    subject: "Welcome to the Ming Team! 🎉",
    text: `Hi there,

Welcome to Ming! 🎉 We’re thrilled to have you join our journey toward building a more open web.

We’re excited to have you as part of our community of builders and innovators utilising decentralised computing to power self-hosting securely and efficiently.

With Ming, you have access to a network of distributed nodes that provide a sandbox environment for hosting projects, apps, or services with enhanced control over data and infrastructure. We’re here to support your journey in leveraging Web3 technology for a more open, reliable, and secure cloud experience.

Here’s how to get started:
- Explore the Platform: Log in to explore Ming’s dashboard, which allows you to spin up environments, track resources, and manage your decentralized hosting needs.
- Check Out the Developer Resources: Our documentation at https://docs.minginc.xyz provides tutorials, guides, and tips to help you make the most out of Ming’s features.
- Reach Out Anytime: Our support team is here to help. For any questions, don’t hesitate to reach out at support@minginc.xyz or join our community at https://discord.gg/H78PVheTXp.

Thank you for joining us in redefining the cloud. We’re excited to see what you build on Ming!

Best regards,
Lexy
Founder, Ming Headquarters
lexy@minginc.xyz`,
  };

  try {
    await transporter.sendMail(userMailOptions);
    console.log(`Welcome email sent to ${userEmail}`);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
}
