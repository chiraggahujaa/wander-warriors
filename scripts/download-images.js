const https = require('https');
const fs = require('fs');
const path = require('path');

// Unsplash API configuration
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || '';
const UNSPLASH_API_URL = 'https://api.unsplash.com';

// Image mappings with search queries
const imageConfig = {
  hero: [
    { filename: 'main-hero.jpg', query: 'nepal himalaya mountains trekking', width: 1920, height: 1080 },
    { filename: 'about-hero.jpg', query: 'nepal mountain guide sherpa', width: 1920, height: 1080 },
    { filename: 'services-hero.jpg', query: 'nepal trekking group adventure', width: 1920, height: 1080 },
    { filename: 'treks-hero.jpg', query: 'nepal mountain range himalaya', width: 1920, height: 1080 },
  ],
  treks: {
    ebc: [
      { filename: 'ebc-hero.jpg', query: 'everest base camp nepal', width: 1920, height: 1080 },
      { filename: 'ebc-1.jpg', query: 'everest base camp trekking', width: 1200, height: 800 },
      { filename: 'ebc-2.jpg', query: 'everest mountain view', width: 1200, height: 800 },
      { filename: 'ebc-3.jpg', query: 'everest region nepal sherpa', width: 1200, height: 800 },
      { filename: 'ebc-4.jpg', query: 'khumbu valley everest', width: 1200, height: 800 },
    ],
    abc: [
      { filename: 'abc-hero.jpg', query: 'annapurna base camp nepal', width: 1920, height: 1080 },
      { filename: 'abc-1.jpg', query: 'annapurna sanctuary trekking', width: 1200, height: 800 },
      { filename: 'abc-2.jpg', query: 'annapurna mountains view', width: 1200, height: 800 },
      { filename: 'abc-3.jpg', query: 'annapurna trek path', width: 1200, height: 800 },
      { filename: 'abc-4.jpg', query: 'annapurna base camp panorama', width: 1200, height: 800 },
    ],
    circuit: [
      { filename: 'circuit-hero.jpg', query: 'annapurna circuit nepal', width: 1920, height: 1080 },
      { filename: 'circuit-1.jpg', query: 'annapurna circuit trekking', width: 1200, height: 800 },
      { filename: 'circuit-2.jpg', query: 'thorong la pass nepal', width: 1200, height: 800 },
      { filename: 'circuit-3.jpg', query: 'annapurna circuit landscape', width: 1200, height: 800 },
      { filename: 'circuit-4.jpg', query: 'annapurna circuit village', width: 1200, height: 800 },
    ],
    langtang: [
      { filename: 'langtang-hero.jpg', query: 'langtang valley nepal', width: 1920, height: 1080 },
      { filename: 'langtang-1.jpg', query: 'langtang trek mountains', width: 1200, height: 800 },
      { filename: 'langtang-2.jpg', query: 'langtang national park', width: 1200, height: 800 },
      { filename: 'langtang-3.jpg', query: 'langtang valley trekking', width: 1200, height: 800 },
      { filename: 'langtang-4.jpg', query: 'langtang mountain view', width: 1200, height: 800 },
    ],
    manaslu: [
      { filename: 'manaslu-hero.jpg', query: 'manaslu circuit nepal', width: 1920, height: 1080 },
      { filename: 'manaslu-1.jpg', query: 'manaslu mountain trekking', width: 1200, height: 800 },
      { filename: 'manaslu-2.jpg', query: 'manaslu circuit trek', width: 1200, height: 800 },
      { filename: 'manaslu-3.jpg', query: 'manaslu mountain range', width: 1200, height: 800 },
      { filename: 'manaslu-4.jpg', query: 'manaslu valley nepal', width: 1200, height: 800 },
    ],
    poonhill: [
      { filename: 'poonhill-hero.jpg', query: 'poon hill sunrise nepal', width: 1920, height: 1080 },
      { filename: 'poonhill-1.jpg', query: 'poon hill annapurna sunrise', width: 1200, height: 800 },
      { filename: 'poonhill-2.jpg', query: 'poon hill trekking', width: 1200, height: 800 },
      { filename: 'poonhill-3.jpg', query: 'ghorepani poon hill', width: 1200, height: 800 },
      { filename: 'poonhill-4.jpg', query: 'poon hill mountain view', width: 1200, height: 800 },
    ],
    mustang: [
      { filename: 'mustang-hero.jpg', query: 'upper mustang nepal', width: 1920, height: 1080 },
      { filename: 'mustang-1.jpg', query: 'mustang trek landscape', width: 1200, height: 800 },
      { filename: 'mustang-2.jpg', query: 'upper mustang desert', width: 1200, height: 800 },
      { filename: 'mustang-3.jpg', query: 'mustang monastery nepal', width: 1200, height: 800 },
      { filename: 'mustang-4.jpg', query: 'mustang valley tibet', width: 1200, height: 800 },
    ],
  },
};

// Delay function to respect rate limits
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file if error
      reject(err);
    });
  });
}

// Search Unsplash for an image
async function searchUnsplashImage(query, width, height) {
  return new Promise((resolve, reject) => {
    const searchUrl = `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;

    const options = {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    };

    https.get(searchUrl, options, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.results && result.results.length > 0) {
            const photo = result.results[0];
            // Get image URL with specific dimensions
            const imageUrl = `${photo.urls.raw}&w=${width}&h=${height}&fit=crop`;
            resolve({
              url: imageUrl,
              author: photo.user.name,
              authorUrl: photo.user.links.html,
              downloadLocation: photo.links.download_location,
            });
          } else {
            reject(new Error(`No images found for query: ${query}`));
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Trigger download on Unsplash (required by their API guidelines)
function triggerDownload(downloadLocation) {
  return new Promise((resolve) => {
    const options = {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    };

    https.get(downloadLocation, options, () => {
      resolve();
    }).on('error', () => {
      resolve(); // Don't fail if this doesn't work
    });
  });
}

// Main function
async function downloadAllImages() {
  if (!UNSPLASH_ACCESS_KEY) {
    console.error('❌ Error: UNSPLASH_ACCESS_KEY environment variable not set');
    console.log('\n📝 To get started:');
    console.log('1. Go to https://unsplash.com/developers');
    console.log('2. Register as a developer (free)');
    console.log('3. Create a new application');
    console.log('4. Copy your Access Key');
    console.log('5. Add to .env.local: UNSPLASH_ACCESS_KEY=your_key_here');
    console.log('6. Run: UNSPLASH_ACCESS_KEY=your_key node scripts/download-images.js\n');
    process.exit(1);
  }

  console.log('🏔️  Starting image download from Unsplash...\n');

  const publicDir = path.join(__dirname, '..', 'public', 'images');
  let successCount = 0;
  let failCount = 0;

  // Download hero images
  console.log('📸 Downloading hero images...');
  for (const image of imageConfig.hero) {
    try {
      const filepath = path.join(publicDir, 'hero', image.filename);
      console.log(`  Searching for: ${image.query}`);

      const photoData = await searchUnsplashImage(image.query, image.width, image.height);
      console.log(`  Found by: ${photoData.author}`);

      await downloadImage(photoData.url, filepath);
      await triggerDownload(photoData.downloadLocation);

      console.log(`  ✅ Downloaded: ${image.filename}`);
      successCount++;

      // Rate limiting: wait 1 second between requests (free tier = 50 req/hour)
      await delay(1000);
    } catch (error) {
      console.error(`  ❌ Failed: ${image.filename} - ${error.message}`);
      failCount++;
    }
  }

  // Download trek images
  for (const [trekName, images] of Object.entries(imageConfig.treks)) {
    console.log(`\n📸 Downloading ${trekName.toUpperCase()} trek images...`);

    for (const image of images) {
      try {
        const filepath = path.join(publicDir, 'treks', image.filename);
        console.log(`  Searching for: ${image.query}`);

        const photoData = await searchUnsplashImage(image.query, image.width, image.height);
        console.log(`  Found by: ${photoData.author}`);

        await downloadImage(photoData.url, filepath);
        await triggerDownload(photoData.downloadLocation);

        console.log(`  ✅ Downloaded: ${image.filename}`);
        successCount++;

        // Rate limiting
        await delay(1000);
      } catch (error) {
        console.error(`  ❌ Failed: ${image.filename} - ${error.message}`);
        failCount++;
      }
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Successfully downloaded: ${successCount} images`);
  console.log(`❌ Failed: ${failCount} images`);
  console.log('='.repeat(50));
  console.log('\n📝 Note: Unsplash requires attribution. Consider adding photo credits to your website.');
}

// Run the script
downloadAllImages().catch(console.error);
