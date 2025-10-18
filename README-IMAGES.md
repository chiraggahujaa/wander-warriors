# Image Management Guide

## Downloading Real Images from Unsplash

This project includes a script to automatically download high-quality trekking images from Unsplash to replace the placeholder images.

### Setup Instructions

#### 1. Get Your Free Unsplash API Key

1. Visit [Unsplash Developers](https://unsplash.com/developers)
2. Sign up or log in to your Unsplash account
3. Click "New Application"
4. Accept the API terms
5. Fill in the application details:
   - Application name: "Wander Warriors Website"
   - Description: "Trekking website for Nepal adventures"
6. Copy your **Access Key** (it looks like: `abc123xyz...`)

#### 2. Configure Your Environment

Add your Unsplash API key to your `.env.local` file:

```bash
# Create .env.local if it doesn't exist
cp .env.example .env.local

# Add your Unsplash API key
echo "UNSPLASH_ACCESS_KEY=your_actual_key_here" >> .env.local
```

#### 3. Run the Download Script

```bash
# Option 1: Using the environment variable from .env.local
node -r dotenv/config scripts/download-images.js

# Option 2: Set the key directly in the command
UNSPLASH_ACCESS_KEY=your_key_here node scripts/download-images.js
```

### What Gets Downloaded

The script will download **39 high-quality images**:

#### Hero Images (4 images)
- `main-hero.jpg` - Main landing page hero
- `about-hero.jpg` - About page hero
- `services-hero.jpg` - Services page hero
- `treks-hero.jpg` - Treks page hero

#### Trek Gallery Images (35 images - 5 per trek)
Each trek gets 1 hero image + 4 gallery images:

- **Everest Base Camp (EBC)** - 5 images
- **Annapurna Base Camp (ABC)** - 5 images
- **Annapurna Circuit** - 5 images
- **Langtang Valley** - 5 images
- **Manaslu Circuit** - 5 images
- **Poon Hill** - 5 images
- **Upper Mustang** - 5 images

### Script Features

- **Automatic Search**: Uses targeted search queries for each trek
- **Optimized Sizes**: Hero images (1920x1080), Gallery images (1200x800)
- **Rate Limited**: Respects Unsplash's 50 requests/hour limit (free tier)
- **Progress Tracking**: Shows download progress in real-time
- **Error Handling**: Continues even if some images fail
- **API Compliance**: Triggers download tracking as required by Unsplash

### Unsplash API Limits

**Free Tier:**
- 50 requests per hour
- 100 requests per day (demo apps)

The script includes 1-second delays between requests to stay within limits. Downloading all 39 images takes approximately **40-45 minutes**.

### Important: Image Attribution

Unsplash requires attribution for free use. Consider adding photo credits to your website footer or an attributions page:

```jsx
// Example attribution component
<div className="text-sm text-gray-500">
  Photos by talented photographers on{' '}
  <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">
    Unsplash
  </a>
</div>
```

### Troubleshooting

**Error: "UNSPLASH_ACCESS_KEY environment variable not set"**
- Make sure you've added your API key to `.env.local`
- Check that the key is correct (no extra spaces or quotes)

**Error: "No images found for query"**
- The search query might be too specific
- The script will continue with other images
- You can manually edit the queries in `scripts/download-images.js`

**Rate Limit Exceeded**
- Wait an hour and try again
- The script saves progress, so already downloaded images won't be re-downloaded

### Alternative: Manual Image Sources

If you prefer not to use the script, here are alternative free image sources:

1. **[Unsplash](https://unsplash.com/)** - Free high-quality photos (requires attribution)
2. **[Pexels](https://www.pexels.com/)** - Free stock photos (no attribution required)
3. **[Pixabay](https://pixabay.com/)** - Free images (no attribution required)
4. **[Wikimedia Commons](https://commons.wikimedia.org/)** - Free media (check individual licenses)

### Customizing the Script

You can edit the search queries in [scripts/download-images.js](scripts/download-images.js):

```javascript
// Example: Change the Everest Base Camp hero query
ebc: [
  { filename: 'ebc-hero.jpg', query: 'your custom search query', width: 1920, height: 1080 },
  // ...
]
```

### Need Help?

If you encounter issues:
1. Check the console output for specific error messages
2. Verify your API key is correct
3. Ensure you have write permissions to the `public/images/` directory
4. Check your internet connection

For more information, visit the [Unsplash API Documentation](https://unsplash.com/documentation).
