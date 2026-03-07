// EmailJS Configuration
// All credentials must be set in the .env file in the root directory:
// REACT_APP_EMAILJS_SERVICE_ID=your_service_id
// REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
// REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
//
// Setup instructions:
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Create an email service (connect your Gmail)
// 3. Create an email template
// 4. Get your Public Key from Account settings
// 5. Add the credentials to your .env file

export const emailConfig = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
};
