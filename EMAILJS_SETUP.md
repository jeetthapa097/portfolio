# EmailJS Setup Instructions

To enable email functionality for the quote form, you need to set up EmailJS (free service, no backend required).

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Connect your Gmail account (yourinsurance313@gmail.com)
5. Copy the **Service ID** (you'll need this)

## Step 3: Create Email Template
1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use this template:

**Template Name:** Quote Request

**Subject:** New Insurance Quote Request from {{from_name}}

**Content:**
```
New Quote Request Received

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Zip Code: {{zip_code}}

Current Policy: {{current_policy}}
Preferred Contact Method: {{contact_method}}
Text Message Opt-in: {{text_opt_in}}

Insurance Types Requested:
{{insurance_types}}

---
This email was sent from Your Insurance Services website.
```

4. Set "To Email" to: yourinsurance313@gmail.com
5. Copy the **Template ID** (you'll need this)

## Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

## Step 5: Update QuoteForm.js
Replace these values in `src/components/QuoteForm.js`:

```javascript
await emailjs.send(
  'YOUR_SERVICE_ID',     // Replace with Service ID from Step 2
  'YOUR_TEMPLATE_ID',    // Replace with Template ID from Step 3
  templateParams,
  'YOUR_PUBLIC_KEY'      // Replace with Public Key from Step 4
);
```

## Alternative: Quick Setup Script
You can also create a `.env` file in the root directory:

```
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

Then update QuoteForm.js to use:
```javascript
await emailjs.send(
  process.env.REACT_APP_EMAILJS_SERVICE_ID,
  process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  templateParams,
  process.env.REACT_APP_EMAILJS_PUBLIC_KEY
);
```

## Testing
1. Fill out the quote form
2. Submit it
3. Check your email (yourinsurance313@gmail.com) for the quote request

## Free Tier Limits
- 200 emails/month (free tier)
- Upgrade if you need more

## Troubleshooting
- Make sure all IDs are correct
- Check EmailJS dashboard for error logs
- Verify your email service is connected properly
