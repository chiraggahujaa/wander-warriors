# Deployment Guide - Wander Warriors

## ✅ Code Successfully Pushed to GitHub!

**Repository:** https://github.com/chiraggahujaa/wander-warriors

---

## Quick Deploy Options

### Option 1: Deploy to Vercel (Recommended - 2 minutes)

1. **Visit:** https://vercel.com/new

2. **Import your GitHub repository:**
   - Click "Import Project"
   - Select: `chiraggahujaa/wander-warriors`

3. **Configure (auto-detected):**
   - Framework: Next.js ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `out` ✅

4. **Click "Deploy"** - Done! 🚀

**Your site will be live at:** `wander-warriors.vercel.app`

---

### Option 2: Deploy to Netlify (3 minutes)

1. **Visit:** https://app.netlify.com/start

2. **Connect to GitHub:**
   - Select: `chiraggahujaa/wander-warriors`

3. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `out`

4. **Click "Deploy site"** - Done! 🚀

**Your site will be live at:** `wander-warriors.netlify.app`

---

## Advanced: Custom Domain Setup

### On Vercel

1. Go to your project settings
2. Click "Domains"
3. Add your domain (e.g., `wanderwarriors.com`)
4. Update DNS records as instructed
5. SSL certificate auto-configured ✅

### On Netlify

1. Go to "Domain settings"
2. Click "Add custom domain"
3. Follow DNS configuration steps
4. SSL certificate auto-configured ✅

---

## Environment Variables (Optional)

If you want to use environment variables:

### On Vercel/Netlify Dashboard:

```
NEXT_PUBLIC_PHONE=+977 9864261982
NEXT_PUBLIC_EMAIL=info@wanderwarriors.com
NEXT_PUBLIC_WHATSAPP=9779864261982
```

Then update `lib/constants.ts`:

```typescript
export const COMPANY_INFO: CompanyInfo = {
  phone: process.env.NEXT_PUBLIC_PHONE || '+977 9864261982',
  email: process.env.NEXT_PUBLIC_EMAIL || 'info@wanderwarriors.com',
  // ...
};
```

---

## Update Sitemap Domain

Before deploying, update your domain in `app/sitemap.ts`:

```typescript
const baseUrl = 'https://wanderwarriors.com'; // Change to your actual domain
```

Also update `public/robots.txt`:

```
Sitemap: https://wanderwarriors.com/sitemap.xml
```

---

## Post-Deployment Checklist

After your first deployment:

- [ ] Test all pages load correctly
- [ ] Verify WhatsApp links work on mobile
- [ ] Check responsive design on different devices
- [ ] Test contact form functionality
- [ ] Verify all trek pages are accessible
- [ ] Check images are loading
- [ ] Test navigation menu
- [ ] Verify SEO metadata (view page source)

---

## Continuous Deployment

Both Vercel and Netlify support automatic deployments:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Update trek information"
   git push
   ```

2. **Auto-deploy** - Your changes go live automatically! 🎉

---

## Local Preview Before Deploy

Always test locally before pushing:

```bash
# Build the site
npm run build

# Preview the production build
npx serve@latest out
```

Visit: http://localhost:3000

---

## Rollback a Deployment

### On Vercel
- Go to "Deployments"
- Find previous working version
- Click "Promote to Production"

### On Netlify
- Go to "Deploys"
- Find previous deploy
- Click "Publish deploy"

---

## Performance Optimization Tips

After deploying:

1. **Check Lighthouse Score:**
   - Open DevTools (F12)
   - Go to Lighthouse tab
   - Run audit
   - Target: 90+ scores

2. **Replace placeholder images:**
   - Use WebP format for best performance
   - Compress images (max 200KB each)
   - Maintain aspect ratios

3. **Enable caching:**
   - Both Vercel and Netlify handle this automatically
   - CDN enabled by default

---

## Monitoring

### Vercel Analytics (Free)
- Go to project settings
- Enable "Analytics"
- Track page views, performance

### Netlify Analytics ($9/month)
- Premium feature
- Real-time visitor data
- Performance metrics

---

## Support & Troubleshooting

### Build Fails?

1. Check the build logs in Vercel/Netlify
2. Verify build works locally: `npm run build`
3. Check Node.js version (should be 18+)

### Images Not Showing?

1. Verify images exist in `public/images/`
2. Check file paths in `lib/treks-data.ts`
3. Ensure filenames match exactly

### WhatsApp Links Not Working?

1. Verify number format in `lib/constants.ts`
2. Test the link: `https://wa.me/9779864261982`
3. Check on mobile device

---

## Next Steps

1. **Deploy Now** - Use Vercel or Netlify
2. **Replace Images** - Add your actual trek photos
3. **Update Content** - Customize as needed
4. **Add Custom Domain** - Point your domain to the site
5. **Test Everything** - Ensure all features work
6. **Go Live!** 🚀

---

## GitHub Repository

**URL:** https://github.com/chiraggahujaa/wander-warriors

**Git Commands:**
```bash
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Your message"

# Push to GitHub
git push

# Pull latest changes
git pull
```

---

## Deployment Checklist

Before going live:

- [ ] All placeholder images replaced
- [ ] Contact information updated
- [ ] Domain configured in sitemap.ts
- [ ] robots.txt updated with domain
- [ ] Site tested on mobile devices
- [ ] WhatsApp links tested
- [ ] All forms tested
- [ ] Content reviewed
- [ ] SEO verified
- [ ] Performance checked (Lighthouse)

---

**Your website is ready to deploy! Choose Vercel or Netlify and go live in minutes.** 🎉

**Repository:** https://github.com/chiraggahujaa/wander-warriors
