# EmailJS Setup Guide

Follow these steps to set up email notifications for your contact form:

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Select **Gmail**
4. Click **Connect Account** and log in with `work.neellathiya@gmail.com`
5. Copy the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template content:

**Template Name:** `portfolio_contact`

**Subject:**
```
New Contact Form Submission from {{from_name}}
```

**Body:**
```
You have a new message from your portfolio contact form!

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Sent from your portfolio website
```

4. Click **Save**
5. Copy the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to **Account** (click your email in top right)
2. Find **Public Key** section
3. Copy your **Public Key** (e.g., `abcdef123456`)

## Step 5: Update Environment Variables

Edit the `.env` file in your project root:

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abcdef123456
```

Replace the values with your actual IDs from EmailJS.

## Step 6: Restart Your App

```bash
npm run dev
```

## Step 7: Test!

1. Go to your contact form
2. Fill it out and submit
3. Check `work.neellathiya@gmail.com` for the email!

## Important Notes

- **Free Plan:** 200 emails/month
- **Gmail Security:** If emails aren't sending, check Gmail settings and enable "Less secure app access" or use App Passwords
- **Template Variables:** Make sure template uses: `{{from_name}}`, `{{from_email}}`, `{{message}}`

## Troubleshooting

**Emails not arriving?**
- Check EmailJS dashboard for failed sends
- Verify your Public Key is correct
- Check spam folder
- Make sure Gmail account is properly connected

**Getting errors?**
- Check browser console for error messages
- Verify all three environment variables are set
- Restart your dev server after changing .env

## Production Deployment

When deploying to Vercel/Netlify, add these environment variables in your deployment settings:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
