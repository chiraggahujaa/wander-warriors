# Airtable Comments System Setup Guide

This guide will help you set up Airtable for the trek comments functionality.

## What is Airtable?

Airtable is a cloud-based database service that's easy to use and perfect for storing trek comments. It offers:
- **Free tier**: 1,000 records (comments) per base
- **Easy moderation**: Approve/reject comments via website or mobile app
- **No coding required**: Simple point-and-click interface
- **Reliable**: Professional-grade service

## Step 1: Create an Airtable Account

1. Go to [https://airtable.com/signup](https://airtable.com/signup)
2. Sign up with your email
3. Verify your email address
4. **Free plan is perfect** - no credit card required

## Step 2: Create a New Base

1. Click **"Add a base"** on your Airtable home screen
2. Choose **"Start from scratch"**
3. Name it: `Wander Warriors Comments`
4. Click **Create base**

## Step 3: Set Up the Comments Table

By default, Airtable creates a table called "Table 1". Rename it to **"Comments"**.

### Add These Fields:

Click the **"+"** button to add each field with the exact names and types:

1. **trek_slug** (Single line text)
   - This stores which trek the comment is for
   - Examples: "langtang-trek", "annapurna-base-camp"

2. **name** (Single line text)
   - Commenter's name (or "Anonymous")

3. **email** (Email)
   - Optional email address (not shown publicly)

4. **comment** (Long text)
   - The actual comment text

5. **status** (Single select)
   - Click to add options:
     - `pending` (default) - Yellow color
     - `approved` - Green color
     - `spam` - Red color
   - **Set "pending" as default option**

6. **ip_hash** (Single line text)
   - For rate limiting (hashed IP address)

7. **created_at** (Date with time)
   - When the comment was submitted
   - Enable time formatting

### Your table should look like this:

```
| trek_slug | name | email | comment | status | ip_hash | created_at |
|-----------|------|-------|---------|--------|---------|------------|
```

## Step 4: Get Your API Key

1. Click your **profile icon** (top right)
2. Go to **Account** → **Developer hub**
3. Or directly visit: [https://airtable.com/create/tokens](https://airtable.com/create/tokens)
4. Click **"Create new token"**
5. Name it: `Wander Warriors Website`
6. Under **Scopes**, select:
   - ✅ `data.records:read`
   - ✅ `data.records:write`
7. Under **Access**, select your base: `Wander Warriors Comments`
8. Click **"Create token"**
9. **Copy the token** (starts with `pat...`) - you won't see it again!

## Step 5: Get Your Base ID

1. Go to your **Wander Warriors Comments** base
2. Look at the URL in your browser:
   ```
   https://airtable.com/appXXXXXXXXXXXXXX/...
                         ^^^^^^^^^^^^^^^^^^
                         This is your Base ID
   ```
3. Copy the part starting with `app` (17 characters)

## Step 6: Configure Your Website

### For Local Development:

1. Create a `.env.local` file in your project root:
   ```bash
   AIRTABLE_API_KEY=pat1234567890abcdef
   AIRTABLE_BASE_ID=appXXXXXXXXXXXXXXX
   ```

2. Restart your development server:
   ```bash
   npm run dev
   ```

### For Production (Vercel):

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add:
   - `AIRTABLE_API_KEY` = `pat1234567890abcdef`
   - `AIRTABLE_BASE_ID` = `appXXXXXXXXXXXXXXX`
4. Redeploy your site

### For Production (Other Platforms):

Add the environment variables to your deployment platform:
- **Netlify**: Site settings → Environment variables
- **Railway**: Variables tab
- **DigitalOcean App Platform**: App settings → Environment

## Step 7: Test the System

1. Go to any trek page on your website (e.g., `/treks/langtang-trek`)
2. Scroll to the **comments section** at the bottom
3. Submit a test comment
4. Check your Airtable base - you should see the comment with status "pending"

## Step 8: Approve Comments

### On Desktop (Recommended):

1. Open your Airtable base in browser
2. Find the comment row
3. Click the **status** dropdown
4. Select **"approved"**
5. Refresh your website - the comment now appears!

### On Mobile:

1. Download the **Airtable app** (iOS/Android)
2. Open your base
3. Tap the record
4. Change status to "approved"

### Pro Tip: Create a View for Easy Moderation

1. Click **"Grid view"** dropdown
2. Select **"Create new view"** → **"Grid"**
3. Name it: `Pending Comments`
4. Add filter: `Status = pending`
5. Now you see only pending comments for quick approval!

## How Spam Prevention Works

The system includes multiple spam protections:

1. **Rate Limiting**: Max 1 comment per IP every 30 minutes
2. **Honeypot Field**: Hidden field that bots fill but humans don't
3. **Character Limits**: 10-500 characters required
4. **Manual Approval**: All comments start as "pending"
5. **Validation**: Name, email, and comment format checks

## Managing Comments

### Approve a Comment:
Change status from "pending" → "approved"

### Reject Spam:
Change status to "spam" (it won't show on website)

### Delete a Comment:
Right-click row → Delete record

### Bulk Actions:
Select multiple rows → Change all statuses at once

## Monitoring Usage

### Check Your Record Count:
1. Airtable shows record count at bottom of table
2. Free plan: 1,000 records max
3. At average 10 comments/month = 8+ years of usage

### If You Hit the Limit:
1. Delete old spam comments
2. Archive old approved comments to another base
3. Or upgrade to Team plan ($20/month) = 50,000 records

## Troubleshooting

### Comments not appearing on website?
- Check if status is "approved" (not "pending")
- Refresh your browser
- Check browser console for errors

### "Comment system is not configured" error?
- Verify environment variables are set correctly
- Make sure Base ID starts with "app"
- Restart your dev server

### API errors in console?
- Check API key is valid and not expired
- Ensure scopes include read/write permissions
- Verify base name is exactly "Comments"

### Rate limit not working?
- This is normal - rate limit uses IP hash
- Test from different devices/networks
- Wait 30 minutes between test submissions

## Security Best Practices

✅ **DO:**
- Keep your API key private
- Use environment variables (never commit to Git)
- Regularly review and remove spam
- Monitor for unusual activity

❌ **DON'T:**
- Share your API key publicly
- Commit `.env.local` to Git
- Give write access to untrusted users
- Use the same token for multiple projects

## Need Help?

- **Airtable Support**: [https://support.airtable.com](https://support.airtable.com)
- **API Documentation**: [https://airtable.com/developers/web/api/introduction](https://airtable.com/developers/web/api/introduction)
- **Community Forum**: [https://community.airtable.com](https://community.airtable.com)

## Optional: Set Up Email Notifications

Want to get notified when someone comments?

1. In Airtable, click **Automations** (top right)
2. Create automation:
   - **Trigger**: When record matches conditions
   - **Condition**: Status = pending
   - **Action**: Send email
3. Configure to send to your email
4. Now you'll know immediately when comments arrive!

---

**That's it!** Your comment system is ready. Trekkers can now share their experiences, and you can moderate them easily from anywhere.
