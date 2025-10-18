# Resend Email Integration Setup Guide

## 🎯 What You Need

To make the contact form work, you need:
1. **Resend API Key** (free account)
2. **Contact Email** (where inquiries will be sent)

---

## 📝 Step 1: Get Your Resend API Key

### Create Resend Account (FREE)

1. **Go to:** https://resend.com/signup

2. **Sign up** with your email or GitHub

3. **Verify your email** (check inbox)

4. **Go to API Keys:**
   - Click on "API Keys" in the sidebar
   - Or visit: https://resend.com/api-keys

5. **Create API Key:**
   - Click "Create API Key"
   - Name it: `wander-warriors-production`
   - Click "Add"

6. **Copy the API Key:**
   ```
   re_xxxxxxxxxxxxxxxxxxxx
   ```
   **⚠️ IMPORTANT:** Save this key immediately! You can only see it once.

---

## 🔧 Step 2: Add Environment Variables

### Local Development (.env.local)

1. Create a file called `.env.local` in your project root:

```bash
# In the wander-warriors folder
touch .env.local
```

2. Add these variables to `.env.local`:

```env
RESEND_API_KEY=re_your_actual_api_key_here
CONTACT_EMAIL=sherpaangdawa092@gmail.com
```

**Replace `re_your_actual_api_key_here` with your actual API key from Step 1!**

---

### Vercel Deployment

1. Go to your project on Vercel
2. Click **Settings** → **Environment Variables**
3. Add these variables:

| Name | Value |
|------|-------|
| `RESEND_API_KEY` | `re_your_actual_api_key_here` |
| `CONTACT_EMAIL` | `sherpaangdawa092@gmail.com` |

4. Click **Save**
5. **Redeploy** your site for changes to take effect

---

### Netlify Deployment

1. Go to your site on Netlify
2. Click **Site settings** → **Environment variables**
3. Add these variables:

| Key | Value |
|-----|-------|
| `RESEND_API_KEY` | `re_your_actual_api_key_here` |
| `CONTACT_EMAIL` | `sherpaangdawa092@gmail.com` |

4. **Redeploy** your site

---

## 📧 Step 3: Verify Domain (Optional but Recommended)

### Why Verify Domain?

- By default, emails come from `onboarding@resend.dev`
- Verifying your domain lets you send from `contact@wanderwarriors.com`
- Improves deliverability and looks more professional

### How to Verify (if you have a domain):

1. **Go to:** https://resend.com/domains

2. **Click "Add Domain"**

3. **Enter your domain:** `wanderwarriors.com`

4. **Add DNS Records:**
   - Resend will give you DNS records
   - Add them to your domain provider (Vercel, Cloudflare, etc.)

5. **Verify:**
   - Click "Verify DNS Records"
   - Wait for verification (usually 5-10 minutes)

6. **Update API Route:**
   - Once verified, update `app/api/contact/route.ts`
   - Change line: `from: 'Wander Warriors <onboarding@resend.dev>'`
   - To: `from: 'Wander Warriors <contact@wanderwarriors.com>'`

### If You Don't Have a Domain Yet:

**No problem!** The form will work with `onboarding@resend.dev`. Inquiries will still arrive at your email.

---

## ✅ Step 4: Test the Integration

### Local Testing:

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Go to:** http://localhost:3000/contact

3. **Fill out the form** with test data

4. **Click "Send Inquiry"**

5. **Check:**
   - You should see a success message
   - Check `sherpaangdawa092@gmail.com` inbox
   - Email should arrive within seconds

### What Success Looks Like:

✅ Green success message appears
✅ Email arrives at sherpaangdawa092@gmail.com
✅ Email has all form details formatted nicely

### What Errors Look Like:

❌ Red error message appears
❌ Error message tells you what went wrong:
   - "Email service is not configured" → API key missing
   - "Failed to send" → Check API key is correct
   - "Too many requests" → Hit rate limit (100/day on free tier)

---

## 🆓 Resend Free Tier Limits

**You get for FREE:**
- ✅ **100 emails per day**
- ✅ **3,000 emails per month**
- ✅ No credit card required
- ✅ Perfect for contact forms

**What happens if you hit the limit?**
- Users see error message
- Message tells them to contact via WhatsApp
- Error is logged for you to review

---

## 🔍 Troubleshooting

### Error: "Email service is not configured"

**Problem:** `RESEND_API_KEY` is missing

**Fix:**
1. Check `.env.local` file exists
2. Check variable name is exactly: `RESEND_API_KEY`
3. Restart dev server: `npm run dev`

---

### Error: "Invalid API key"

**Problem:** API key is wrong or expired

**Fix:**
1. Go to https://resend.com/api-keys
2. Create a new API key
3. Update `.env.local` with new key
4. Restart dev server

---

### Emails not arriving

**Problem:** Could be spam folder or Resend issue

**Fix:**
1. Check spam/junk folder
2. Add `noreply@resend.dev` to contacts
3. Check Resend dashboard: https://resend.com/emails
4. See if email shows as "Delivered"

---

### "Too many requests" error

**Problem:** Hit the 100 emails/day limit

**Fix:**
- Wait until next day (resets at midnight UTC)
- Or upgrade Resend account
- Error message tells users to use WhatsApp

---

## 🎨 Email Template

The email that arrives looks like this:

```
Subject: New Trek Inquiry from John Doe - Everest Base Camp Trek

---------------------------------------------------
New Trek Inquiry from Wander Warriors Website
---------------------------------------------------

CONTACT INFORMATION:
Name: John Doe
Email: john@example.com
Phone/WhatsApp: +1234567890

TREK DETAILS:
Trek Interest: Everest Base Camp Trek
Number of People: 4
Preferred Dates: March 2025

MESSAGE:
We're interested in trekking to EBC in March...

---------------------------------------------------
This inquiry was submitted through the Wander Warriors contact form.
Please respond within 24 hours via WhatsApp or email.
```

---

## 🔐 Security Notes

**DO NOT:**
- ❌ Commit `.env.local` to Git
- ❌ Share your API key publicly
- ❌ Put API key in code

**DO:**
- ✅ Keep API key in environment variables
- ✅ Use `.env.local` for local development
- ✅ Use platform environment variables for production
- ✅ Regenerate key if compromised

---

## 📊 Monitor Your Emails

**Resend Dashboard:** https://resend.com/emails

You can see:
- How many emails sent
- Delivery status
- Bounce rate
- Error logs

---

## 🆙 Next Steps (Optional)

1. **Verify your domain** for professional sender address
2. **Add email templates** for better formatting
3. **Set up webhooks** for delivery notifications
4. **Monitor usage** on Resend dashboard

---

## 📞 Support

**Resend Issues:**
- Documentation: https://resend.com/docs
- Support: support@resend.com

**Integration Issues:**
- Check the API route: `app/api/contact/route.ts`
- Check the form: `components/ContactForm.tsx`
- Review error messages in browser console

---

## ✅ Quick Checklist

Before deploying:

- [ ] Created Resend account
- [ ] Got API key from https://resend.com/api-keys
- [ ] Added `RESEND_API_KEY` to `.env.local`
- [ ] Added `CONTACT_EMAIL=sherpaangdawa092@gmail.com`
- [ ] Tested form locally
- [ ] Email received at sherpaangdawa092@gmail.com
- [ ] Added environment variables to Vercel/Netlify
- [ ] Redeployed site
- [ ] Tested form on live site

---

**You're all set! Contact form will now send emails via Resend.** ✨
