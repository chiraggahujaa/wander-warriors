const fs = require('fs');
const path = require('path');

// Ensure directories exist
const dirs = [
  'public/images/hero',
  'public/images/treks',
];

dirs.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Function to create SVG placeholder
function createPlaceholder(text, width, height, color1, color2) {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#grad)"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="white" text-anchor="middle" dy=".3em">${text}</text>
</svg>`;
}

// Generate hero images
const heroImages = [
  { name: 'main-hero.jpg', text: 'Wander Warriors - Main Hero' },
  { name: 'about-hero.jpg', text: 'About Us' },
  { name: 'services-hero.jpg', text: 'Our Services' },
  { name: 'treks-hero.jpg', text: 'Nepal Treks' },
];

heroImages.forEach(img => {
  const svg = createPlaceholder(img.text, 1920, 1080, '#1E3A8A', '#7C3AED');
  fs.writeFileSync(path.join(__dirname, '..', 'public/images/hero', img.name), svg);
});

// Generate trek images
const treks = [
  'langtang',
  'abc',
  'circuit',
  'ebc',
  'manaslu',
  'poonhill',
  'mustang',
];

treks.forEach(trek => {
  // Hero image
  const heroSvg = createPlaceholder(`${trek.toUpperCase()} Trek`, 1920, 1080, '#F97316', '#DC2626');
  fs.writeFileSync(path.join(__dirname, '..', 'public/images/treks', `${trek}-hero.jpg`), heroSvg);

  // Gallery images
  for (let i = 1; i <= 4; i++) {
    const gallerySvg = createPlaceholder(`${trek.toUpperCase()} - ${i}`, 800, 600, '#059669', '#1E3A8A');
    fs.writeFileSync(path.join(__dirname, '..', 'public/images/treks', `${trek}-${i}.jpg`), gallerySvg);
  }
});

console.log('✅ Placeholder images generated successfully!');
console.log('📁 Generated in public/images/');
console.log('📝 You can now replace these with actual photos.');
