# Wander Warriors - Professional Trekking Website

A modern, fully responsive static website for Wander Warriors, a professional trekking guide service company based in Nepal. Built with Next.js 14+, TypeScript, and Tailwind CSS.

## Features

- **7 Featured Trek Pages**: Detailed information for popular Nepal treks including Everest Base Camp, Annapurna Circuit, Langtang, and more
- **Fully Responsive**: Mobile-first design that works perfectly on all devices
- **Static Site Generation**: Fast-loading, SEO-optimized static pages
- **WhatsApp Integration**: Direct contact via WhatsApp throughout the site
- **Trek Filtering**: Filter treks by difficulty and duration
- **Contact Form**: Full-featured contact form with validation
- **SEO Optimized**: Complete metadata, sitemap, and robots.txt
- **Modern UI**: Clean, professional design with smooth animations

## Tech Stack

- **Framework**: Next.js 14.2+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Image Handling**: Next.js Image component
- **Deployment**: Static export for Vercel, Netlify, or any static host

## Project Structure

```
wander-warriors/
├── app/                      # Next.js app directory
│   ├── about/               # About page
│   ├── services/            # Services page
│   ├── treks/               # Treks listing and detail pages
│   │   ├── [slug]/         # Dynamic trek pages
│   │   └── page.tsx        # All treks listing
│   ├── contact/            # Contact page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── not-found.tsx       # 404 page
│   ├── sitemap.ts          # Dynamic sitemap
│   └── globals.css         # Global styles
├── components/             # Reusable components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── TrekCard.tsx
│   ├── ServiceCard.tsx
│   ├── HeroSection.tsx
│   ├── ContactForm.tsx
│   └── WhatsAppButton.tsx
├── lib/                    # Data and utilities
│   ├── treks-data.ts      # All trek information
│   ├── services-data.ts   # Service offerings
│   └── constants.ts       # Company info and constants
├── types/                  # TypeScript types
│   └── index.ts
├── public/                 # Static assets
│   ├── images/
│   │   ├── hero/          # Hero images
│   │   └── treks/         # Trek images
│   └── robots.txt
└── scripts/
    └── generate-placeholders.js
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

### Running Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates an optimized static build in the `out/` directory.

### Testing the Production Build

```bash
npm run build
npx serve@latest out
```

## Customization Guide

### 1. Update Company Information

Edit `/lib/constants.ts`:

```typescript
export const COMPANY_INFO: CompanyInfo = {
  name: 'Wander Warriors',
  tagline: 'Your Trusted Companions in the Himalayas',
  phone: '+977 9864261982',      // Update your phone
  whatsapp: '+977 9864261982',   // Update your WhatsApp
  email: 'info@wanderwarriors.com', // Update your email
  location: 'Nepal',
};
```

### 2. Update WhatsApp Link

In `/lib/constants.ts`, update the WhatsApp number:

```typescript
export const WHATSAPP_LINK = `https://wa.me/9779864261982`; // Change the number
```

### 3. Add/Edit Trek Information

Edit `/lib/treks-data.ts`:

```typescript
export const TREKS: Trek[] = [
  {
    id: '1',
    slug: 'trek-name',        // URL-friendly name
    name: 'Trek Name',        // Display name
    tagline: 'Brief tagline',
    duration: '7-10 days',
    durationDays: 8,          // For filtering
    difficulty: 'Moderate',   // Easy, Moderate, or Challenging
    maxAltitude: '4,984m',
    maxAltitudeMeters: 4984,
    bestSeason: 'March-May, September-November',
    overview: ['Paragraph 1', 'Paragraph 2'],
    highlights: ['Highlight 1', 'Highlight 2'],
    itinerary: 'Brief itinerary description',
    included: ['Item 1', 'Item 2'],
    excluded: ['Item 1', 'Item 2'],
    images: {
      hero: '/images/treks/trek-name-hero.jpg',
      gallery: [
        '/images/treks/trek-name-1.jpg',
        '/images/treks/trek-name-2.jpg',
      ],
    },
    featured: true,  // Shows on homepage
  },
  // Add more treks...
];
```

### 4. Replace Placeholder Images

Placeholder images are located in `public/images/`. Replace them with actual photos:

**Hero Images** (1920x1080px recommended):
- `/public/images/hero/main-hero.jpg` - Homepage hero
- `/public/images/hero/about-hero.jpg` - About page hero
- `/public/images/hero/services-hero.jpg` - Services page hero
- `/public/images/hero/treks-hero.jpg` - Treks listing hero

**Trek Images**:
- Hero: `/public/images/treks/[trek-name]-hero.jpg` (1920x1080px)
- Gallery: `/public/images/treks/[trek-name]-1.jpg` through `-4.jpg` (800x600px)

**Tips for Images**:
- Use WebP format for best performance
- Compress images before uploading
- Maintain aspect ratios as specified
- Use descriptive alt text (already configured)

### 5. Update Services

Edit `/lib/services-data.ts` to add, remove, or modify services.

### 6. Customize Colors

Edit `/tailwind.config.ts`:

```typescript
colors: {
  'mountain-blue': '#1E3A8A',     // Primary blue
  'adventure-orange': '#F97316',   // Primary orange
  'nature-green': '#059669',       // Success/WhatsApp green
},
```

### 7. Update Domain in Sitemap

Edit `/app/sitemap.ts`:

```typescript
const baseUrl = 'https://yourdomain.com'; // Change to your domain
```

Also update `/public/robots.txt` with your domain.

## Deployment

This site is configured for static export and can be deployed to:

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy (automatic)

**Or using Vercel CLI:**
```bash
npm install -g vercel
vercel
```

### Netlify

1. Push your code to GitHub
2. Connect repository in Netlify
3. Build command: `npm run build`
4. Publish directory: `out`

**Or using Netlify CLI:**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=out
```

### GitHub Pages

1. Add to `next.config.js`:
```javascript
const nextConfig = {
  output: 'export',
  basePath: '/repository-name', // Only if not using custom domain
  images: {
    unoptimized: true,
  },
}
```

2. Build and deploy:
```bash
npm run build
# Push the 'out' directory to gh-pages branch
```

### Other Static Hosts

Build the site and upload the `out/` directory to any static file host:
```bash
npm run build
# Upload 'out' folder to your hosting provider
```

## Environment Variables (Optional)

For easier updates, you can create a `.env.local` file:

```env
NEXT_PUBLIC_PHONE=+977 9864261982
NEXT_PUBLIC_EMAIL=info@wanderwarriors.com
NEXT_PUBLIC_WHATSAPP=9779864261982
```

Then update the constants file to use these variables.

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

The site is optimized for performance:
- Static generation for fast loading
- Optimized images with Next.js Image component
- Code splitting for minimal bundle size
- Tailwind CSS for minimal CSS overhead

**Target Lighthouse Scores**: 90+ across all metrics

## Accessibility

- Semantic HTML
- ARIA labels where appropriate
- Keyboard navigation support
- Screen reader friendly
- Sufficient color contrast

## SEO Features

- Dynamic metadata for all pages
- Open Graph tags for social sharing
- Automatic sitemap generation
- Robots.txt configuration
- Semantic HTML structure
- Fast loading times

## Troubleshooting

### Build Errors

If you encounter build errors:

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run build
```

### Images Not Showing

- Ensure images are in the correct `public/images/` directories
- Check that image paths in data files match actual file names
- Verify image file extensions (.jpg, .png, .webp)

### WhatsApp Links Not Working

- Verify the number format in `WHATSAPP_LINK` (should be international format without + or spaces)
- Test the link format: `https://wa.me/9779864261982`

## Support

For issues or questions:
- Check the [Next.js documentation](https://nextjs.org/docs)
- Review the [Tailwind CSS docs](https://tailwindcss.com/docs)
- Check component implementations in the codebase

## License

This project is created for Wander Warriors. All rights reserved.

## Credits

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- Fonts from [Google Fonts](https://fonts.google.com/)

---

**Made for Wander Warriors - Your Trusted Companions in the Himalayas**
