# Quick Start Guide - Wander Warriors

## Get Started in 3 Steps

### 1. Install & Run

```bash
npm install
npm run dev
```

Visit: `http://localhost:3000`

### 2. Update Your Information

**Contact Details** - Edit `lib/constants.ts`:
```typescript
phone: '+977 9864261982',     // Change this
whatsapp: '+977 9864261982',  // Change this
email: 'info@wanderwarriors.com', // Change this
```

**WhatsApp Link** - Same file:
```typescript
export const WHATSAPP_LINK = `https://wa.me/9779864261982`; // Update number
```

### 3. Replace Images

Drop your photos into:
- `public/images/hero/` - Hero background images
- `public/images/treks/` - Trek photos

**Naming convention:**
- Hero images: `main-hero.jpg`, `about-hero.jpg`, etc.
- Trek images: `langtang-hero.jpg`, `langtang-1.jpg`, etc.

## Deploy to Vercel

```bash
# Install Vercel CLI (one time)
npm install -g vercel

# Deploy
npm run build
vercel
```

## Common Updates

### Add a New Trek

Edit `lib/treks-data.ts`:

```typescript
{
  id: '8',
  slug: 'new-trek-name',
  name: 'New Trek Name',
  tagline: 'Your tagline here',
  duration: '7-10 days',
  durationDays: 8,
  difficulty: 'Moderate',
  maxAltitude: '4,000m',
  maxAltitudeMeters: 4000,
  bestSeason: 'March-May, September-November',
  overview: ['Description paragraph 1', 'Paragraph 2'],
  highlights: ['Point 1', 'Point 2'],
  itinerary: 'Brief itinerary overview',
  included: ['Included item 1', 'Item 2'],
  excluded: ['Not included item 1', 'Item 2'],
  images: {
    hero: '/images/treks/new-trek-hero.jpg',
    gallery: [
      '/images/treks/new-trek-1.jpg',
      '/images/treks/new-trek-2.jpg',
    ],
  },
  featured: true, // Shows on homepage
}
```

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  'mountain-blue': '#1E3A8A',
  'adventure-orange': '#F97316',
  'nature-green': '#059669',
}
```

### Update Services

Edit `lib/services-data.ts` - add, remove, or modify services.

## Build for Production

```bash
npm run build
```

Static files will be in the `out/` folder.

## Need Help?

- Full documentation: See [README.md](README.md)
- Next.js docs: https://nextjs.org/docs
- Tailwind docs: https://tailwindcss.com/docs

---

**Questions?** Contact support or check the detailed README.md
