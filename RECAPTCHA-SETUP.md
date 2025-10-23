# Google reCAPTCHA v3 Setup Guide

This guide will help you set up Google reCAPTCHA v3 for enhanced spam protection on the Wander Warriors comment system.

## Why reCAPTCHA v3?

reCAPTCHA v3 provides invisible spam protection without requiring users to solve puzzles or click checkboxes. It uses:
- Behavioral analysis to detect bots
- Risk scoring (0.0 = likely bot, 1.0 = likely human)
- No user interaction required (completely invisible)

## Setup Steps

### Step 1: Create reCAPTCHA Keys

1. Go to the [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create)

2. Fill in the registration form:
   - **Label**: `Wander Warriors` (or any descriptive name)
   - **reCAPTCHA type**: Select **"reCAPTCHA v3"** (important!)
   - **Domains**: Add your domains:
     - `localhost` (for local development)
     - `yourdomain.com` (your production domain)
     - `www.yourdomain.com` (if applicable)
   - **Owners**: Your Google account email
   - **Accept reCAPTCHA Terms of Service**: Check the box

3. Click **"Submit"**

4. You'll see two keys:
   - **Site Key** (starts with `6L...`) - Used in the frontend
   - **Secret Key** (starts with `6L...`) - Used in the backend (keep this secure!)

### Step 2: Add Keys to Environment Variables

1. Open your `.env.local` file (create it if it doesn't exist)

2. Add the reCAPTCHA keys:

```bash
# Google reCAPTCHA v3 Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxA
RECAPTCHA_SECRET_KEY=6LxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxB
```

3. Save the file

### Step 3: Test Locally

1. Restart your development server:
```bash
npm run dev
```

2. Navigate to any trek page (e.g., http://localhost:3000/treks/langtang-trek)

3. Open your browser's Developer Tools (F12)

4. Go to the **Console** tab

5. Submit a test comment

6. You should see reCAPTCHA load successfully (no errors in console)

### Step 4: Verify reCAPTCHA is Working

#### Check in Browser Console:
```javascript
// You should see the reCAPTCHA badge in the bottom-right corner
// If you don't see it, check for console errors
```

#### Check in Network Tab:
1. Open Developer Tools → **Network** tab
2. Submit a comment
3. Look for a request to `https://www.google.com/recaptcha/api/siteverify`
4. Check the response - it should include `"success": true` and a score

#### Check Score:
The API route logs reCAPTCHA responses. Check your terminal for:
```
reCAPTCHA verification failed: { success: false, ... }  // If it fails
// No log = success
```

### Step 5: Deploy to Production

1. Add environment variables to your hosting platform:

   **For Vercel:**
   - Go to your project → Settings → Environment Variables
   - Add both keys:
     - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` = your site key
     - `RECAPTCHA_SECRET_KEY` = your secret key

   **For Netlify:**
   - Go to Site settings → Build & deploy → Environment
   - Add both variables

   **For other platforms:**
   - Follow their documentation for adding environment variables

2. Redeploy your application

3. Test on your production domain

## Troubleshooting

### Problem: reCAPTCHA badge doesn't appear

**Solution:**
1. Check if `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set in `.env.local`
2. Restart your dev server after adding environment variables
3. Check browser console for errors
4. Ensure you're using reCAPTCHA **v3** (not v2)

### Problem: "reCAPTCHA verification failed" error

**Solutions:**
1. **Wrong domain:**
   - Go to [reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
   - Click on your site
   - Add `localhost` to the domains list

2. **Wrong keys:**
   - Verify you copied the correct site key and secret key
   - Make sure there are no extra spaces or line breaks

3. **Network issues:**
   - Check if your network blocks Google services
   - Try a different network or VPN

### Problem: All submissions are blocked

**Solution:**
1. Check the score threshold in `app/api/comments/[slug]/route.ts`
   ```typescript
   if (!recaptchaData.success || recaptchaData.score < 0.5) {
   ```
2. Lower the threshold if needed (e.g., `0.3` instead of `0.5`)
3. Note: Google recommends 0.5 as the default threshold

### Problem: Score is too low for legitimate users

**Possible causes:**
- New domains have lower scores initially
- Users with privacy extensions may score lower
- VPN users may score lower

**Solutions:**
1. Lower the threshold temporarily (e.g., 0.3)
2. Monitor scores in production for a week
3. Adjust threshold based on data
4. Consider allowing fallback without reCAPTCHA for edge cases

## Score Interpretation

reCAPTCHA v3 returns a score from 0.0 to 1.0:

| Score | Interpretation | Action |
|-------|----------------|--------|
| 0.9 - 1.0 | Very likely human | ✅ Accept |
| 0.7 - 0.8 | Probably human | ✅ Accept |
| 0.5 - 0.6 | Uncertain | ⚠️ Accept with caution (current threshold) |
| 0.3 - 0.4 | Possibly bot | ❌ Reject (with current settings) |
| 0.0 - 0.2 | Very likely bot | ❌ Reject |

**Current threshold:** 0.5 (configurable in `route.ts`)

## Monitoring reCAPTCHA

### View Analytics:

1. Go to [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click on your site
3. View metrics:
   - Total requests
   - Average score
   - Score distribution
   - Top actions (you'll see `submit_comment`)

### Adjust Settings:

Based on analytics, you can:
- Adjust the score threshold
- Add more domains
- Enable/disable challenge mode
- Set up alerts

## Advanced Configuration

### Custom Action Names

You can track different forms separately:

```typescript
// In CommentForm.tsx
const token = await executeRecaptcha('trek_comment');  // vs 'contact_form'
```

### Multiple Score Thresholds

```typescript
// In route.ts
if (recaptchaData.score >= 0.7) {
  // High confidence - allow immediately
} else if (recaptchaData.score >= 0.5) {
  // Medium confidence - allow with rate limiting
} else if (recaptchaData.score >= 0.3) {
  // Low confidence - flag for review
} else {
  // Very low confidence - reject
}
```

### Fallback Without reCAPTCHA

The current implementation gracefully handles missing reCAPTCHA:

```typescript
// If RECAPTCHA_SECRET_KEY is not set, the check is skipped
if (process.env.RECAPTCHA_SECRET_KEY && recaptchaToken) {
  // Verify only if configured
}
```

This means you can deploy without reCAPTCHA initially and add it later.

## Testing reCAPTCHA

### Test as a Bot:
```bash
# Set RECAPTCHA_SECRET_KEY to a wrong value temporarily
# Submit a comment - should fail reCAPTCHA verification
```

### Test Score Threshold:
```typescript
// In route.ts, log the score
console.log('reCAPTCHA score:', recaptchaData.score);
```

### Test Without reCAPTCHA:
```bash
# Remove NEXT_PUBLIC_RECAPTCHA_SITE_KEY from .env.local
# Restart server
# Form should work without reCAPTCHA
```

## Cost and Limits

- **Free Tier:**
  - Up to 1,000,000 assessments/month
  - Unlimited domains

- **Paid Tier (if needed):**
  - $1 per 1,000 assessments after free tier
  - Advanced bot management features

For a small trekking website, the free tier is more than sufficient.

## Privacy Considerations

reCAPTCHA v3 collects:
- User behavior data
- Browser information
- IP address

Add a privacy notice to your site:

```markdown
This site is protected by Google reCAPTCHA v3. The Google [Privacy Policy](https://policies.google.com/privacy) and [Terms of Service](https://policies.google.com/terms) apply.
```

This is already included in the CommentForm component's info note.

## Resources

- [reCAPTCHA v3 Documentation](https://developers.google.com/recaptcha/docs/v3)
- [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- [reCAPTCHA FAQ](https://developers.google.com/recaptcha/docs/faq)
- [Best Practices](https://developers.google.com/recaptcha/docs/v3#best_practices)

---

**Note:** reCAPTCHA is optional but highly recommended for production. The comment system works without it, using other spam prevention methods (honeypot, content filtering, rate limiting).

