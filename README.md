# Coming Soon Page

An interactive, immersive coming soon page featuring a 3D animated logo with particle effects.

## Features

- **3D Logo Interaction**: Logo tilts and rotates based on mouse position
- **Glitch Effect**: RGB glitch animation on hover
- **Click Ripples**: Expanding wave effect on click
- **Magnetic Pull**: Logo follows cursor when hovering
- **Cursor Trail**: Fading dot trail follows your mouse
- **Three.js Background**: Animated wireframe geometry and floating particles
- **Orbital Rings**: Rotating rings with orbiting dots
- **Scanner Line**: Horizontal light sweep effect
- **Easter Egg**: Press ↑/↓ arrow keys to adjust intensity

## Project Structure

```
coming-soon-app/
├── index.html      # Main HTML file
├── styles.css      # All CSS styles and animations
├── script.js       # JavaScript interactions and Three.js
├── assets/
│   └── logo.png    # Your logo file
└── README.md       # This file
```

---

## Free Hosting Options

### Option 1: Netlify (Recommended - Easiest)

**Why Netlify?**
- Drag-and-drop deployment
- Free SSL certificate
- Custom domain support
- Global CDN

**Steps:**

1. Go to [netlify.com](https://netlify.com) and sign up (free)
2. From your dashboard, drag the entire `coming-soon-app` folder onto the page
3. Done! You'll get a URL like `random-name.netlify.app`

**Connect Your Domain:**

1. Go to Site settings → Domain management → Add custom domain
2. Enter your domain (e.g., `yourdomain.com`)
3. Netlify will provide DNS records
4. At your domain registrar, update your DNS:
   - Add an `A` record pointing to Netlify's IP (provided)
   - Or add a `CNAME` record pointing to your Netlify subdomain

---

### Option 2: Vercel

**Why Vercel?**
- Instant deployments
- Automatic HTTPS
- Great performance

**Steps:**

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Navigate to your project folder:
   ```bash
   cd coming-soon-app
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts

**Connect Your Domain:**

1. Go to your project dashboard on [vercel.com](https://vercel.com)
2. Settings → Domains → Add
3. Enter your domain and follow DNS instructions

---

### Option 3: GitHub Pages

**Why GitHub Pages?**
- Completely free
- Version control built-in
- Reliable hosting

**Steps:**

1. Create a GitHub account at [github.com](https://github.com)

2. Create a new repository named `coming-soon` (or any name)

3. Upload your files via the web interface or use Git:
   ```bash
   cd coming-soon-app
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/coming-soon.git
   git push -u origin main
   ```

4. Go to repository Settings → Pages
5. Under "Source", select `main` branch
6. Your site will be live at `https://YOUR-USERNAME.github.io/coming-soon/`

**Connect Your Domain:**

1. In your repository, create a file named `CNAME` containing only your domain:
   ```
   yourdomain.com
   ```

2. At your domain registrar, add these DNS records:
   - `A` record: `185.199.108.153`
   - `A` record: `185.199.109.153`
   - `A` record: `185.199.110.153`
   - `A` record: `185.199.111.153`
   - Or `CNAME` record: `YOUR-USERNAME.github.io`

---

### Option 4: Cloudflare Pages

**Why Cloudflare Pages?**
- Unlimited bandwidth
- Global CDN
- Excellent performance
- Free SSL

**Steps:**

1. Sign up at [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub account
3. Select your repository
4. Configure build settings (leave blank for static sites)
5. Deploy

**Connect Your Domain:**

If your domain is already on Cloudflare:
1. Go to Pages → Your project → Custom domains
2. Add your domain - it will auto-configure

If not on Cloudflare:
1. Add your domain to Cloudflare first
2. Update nameservers at your registrar
3. Then add to Pages

---

## Quick DNS Reference

For any hosting provider, you'll typically need to add one of these at your domain registrar:

**A Record** (points to IP address):
```
Type: A
Name: @ (or leave blank)
Value: [IP from hosting provider]
TTL: Auto or 3600
```

**CNAME Record** (points to another domain):
```
Type: CNAME
Name: @ or www
Value: [your-site.netlify.app or similar]
TTL: Auto or 3600
```

---

## Common Domain Registrars & How to Update DNS

- **Namecheap**: Domain List → Manage → Advanced DNS
- **GoDaddy**: My Products → DNS → Manage
- **Google Domains**: My domains → DNS
- **Cloudflare**: Select domain → DNS

---

## Customization

### Change the Logo
Replace `assets/logo.png` with your own logo file (keep the same filename, or update references in `index.html`)

### Modify Colors
Edit `styles.css` - search for `rgba(255,255,255` to find white color values

### Adjust Animation Speed
In `styles.css`, modify `animation-duration` values
In `script.js`, modify timing values in animation functions

### Change Intensity Defaults
In `script.js`, modify the `intensity` variable (default: 1, range: 0.5-3)

---

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (touch support included)

---

## Performance Notes

- Animations pause when tab is hidden
- Reduced motion support for accessibility
- Mobile-optimized (some effects disabled on small screens)

---

## License

Feel free to use and modify for your own projects.
