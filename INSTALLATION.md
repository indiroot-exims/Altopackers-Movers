# Alto Packers & Movers Website - Installation Guide

## Quick Start (5 Minutes)

### Option 1: Open Locally in Browser
1. Extract `alto-packers-website.tar.gz` or download files
2. Double-click `index.html` to open in your default browser
3. Navigate using the header menu

### Option 2: Use a Local Server
**Windows (Command Prompt):**
```bash
cd C:\path\to\alto-packers-website
python -m http.server 8000
```
Then visit: `http://localhost:8000`

**Mac/Linux (Terminal):**
```bash
cd /path/to/alto-packers-website
python3 -m http.server 8000
```
Then visit: `http://localhost:8000`

---

## Deployment Options

### Deploy to GitHub Pages (Easiest - Free)

#### Prerequisites:
- GitHub account (free at github.com)
- Git installed on your computer

#### Steps:
1. **Create GitHub Repository:**
   - Go to github.com and log in
   - Click "New repository"
   - Name it: `alto-packers-movers`
   - Choose "Public"
   - Click "Create repository"

2. **Upload Files:**
   - Click "Upload files" button
   - Drag and drop all files from the extracted folder
   - Write commit message: "Initial commit - Alto Packers website"
   - Click "Commit changes"

3. **Enable GitHub Pages:**
   - Go to Settings tab
   - Scroll to "GitHub Pages" section
   - Under "Source", select "Deploy from a branch"
   - Select "main" branch and "/ (root)"
   - Click "Save"

4. **Access Your Site:**
   - Your site will be live at: `https://yourusername.github.io/alto-packers-movers`
   - It takes 1-2 minutes to build

---

### Deploy to Vercel (Recommended - Easiest Deployment)

#### Prerequisites:
- GitHub account
- Files in a GitHub repository

#### Steps:
1. **Go to Vercel:**
   - Visit https://vercel.com
   - Click "Sign Up" and choose "Continue with GitHub"
   - Authorize Vercel to access your GitHub

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Select your `alto-packers-movers` repository
   - Click "Import"
   - Settings are auto-detected (no changes needed)
   - Click "Deploy"

3. **Access Your Site:**
   - Your site is instantly live at a Vercel URL
   - Add a custom domain in Project Settings → Domains

---

### Deploy to Netlify (Very Easy)

#### Prerequisites:
- GitHub account (recommended) or extracted files

#### Option A: Connect GitHub (Recommended)
1. **Go to Netlify:**
   - Visit https://netlify.com
   - Click "Sign up" → "Continue with GitHub"

2. **Connect Repository:**
   - Click "Add new site" → "Import an existing project"
   - Authorize Netlify to GitHub
   - Select `alto-packers-movers` repository
   - Click "Deploy site"

3. **Access Your Site:**
   - Live at: `https://[random-name].netlify.app`
   - Add custom domain in Site Settings → Domain Management

#### Option B: Drag & Drop (Instant)
1. Go to https://netlify.com (sign up if needed)
2. Drag your extracted folder onto "Deploy site" area
3. Your site is live instantly

---

### Deploy to Your Own Web Hosting

#### Prerequisites:
- Web hosting account (GoDaddy, Bluehost, HostGator, etc.)
- FTP client (FileZilla - free)

#### Steps:
1. **Download FileZilla:**
   - Visit https://filezilla-project.org
   - Download and install FileZilla Client

2. **Get FTP Credentials:**
   - Log into your web hosting control panel
   - Find FTP/File Manager section
   - Copy: FTP hostname, username, password

3. **Upload Files:**
   - Open FileZilla
   - File → Site Manager → New site
   - Enter FTP credentials
   - Connect
   - Drag extracted files to the `public_html` folder
   - Wait for upload to complete

4. **Access Your Site:**
   - Visit your domain (e.g., www.yourdomain.com)
   - All pages should work automatically

---

### Deploy to Cloudflare Pages (Free)

#### Prerequisites:
- Cloudflare account (free)
- GitHub account

#### Steps:
1. **Go to Cloudflare:**
   - Visit https://pages.cloudflare.com
   - Click "Create a project"

2. **Connect GitHub:**
   - Select "Connect to Git"
   - Authorize GitHub and select `alto-packers-movers` repo

3. **Configure:**
   - Framework preset: "None"
   - Build command: (leave blank)
   - Build output directory: `/`
   - Click "Save and Deploy"

4. **Access Your Site:**
   - Live at: `https://[project-name].pages.dev`

---

### Deploy to AWS S3 + CloudFront (Scalable)

#### Prerequisites:
- AWS account
- AWS CLI installed
- Basic AWS knowledge

#### Steps:
1. **Create S3 Bucket:**
   - Go to AWS Console
   - Create S3 bucket named `alto-packers`
   - Enable "Static website hosting" in bucket properties
   - Upload all files

2. **Create CloudFront Distribution:**
   - Go to CloudFront
   - Create distribution pointing to S3 bucket
   - Update DNS to CloudFront URL

3. **Access Your Site:**
   - Live at your CloudFront distribution URL
   - Can add custom domain

---

## After Deployment

### 1. Set Up Email for Contact Form
The contact form currently logs to console. Choose one:

**Option A: Formspree (Easiest)**
1. Go to https://formspree.io
2. Sign up for free
3. Create new form
4. In `contact.html`, change form action:
   ```html
   <form method="POST" action="https://formspree.io/f/YOUR_FORM_ID">
   ```
5. Test by submitting contact form

**Option B: EmailJS (Client-Side)**
1. Go to https://www.emailjs.com
2. Sign up for free
3. Get credentials
4. In `script.js`, uncomment and configure EmailJS
5. Emails send directly from browser

**Option C: Getform (Similar to Formspree)**
1. Go to https://getform.io
2. Create form endpoint
3. Update form action in `contact.html`

---

### 2. Add Google Analytics
In all HTML files, add before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_TRACKING_ID');
</script>
```

---

### 3. Update Business Information
Search and replace across all HTML files:

| Old | New |
|-----|-----|
| `+91 8000709840` | Your phone number |
| `221 - Aristo, Kabir Road, Vadodara` | Your address |
| `Vadodara` | Your city |
| `Gujarat` | Your state/region |

---

### 4. Configure WhatsApp Widget
In `script.js`, find the WhatsApp button and update:
```javascript
// Update the WhatsApp link
<a href="https://wa.me/918000709840" target="_blank">
  // Change 918000709840 to your WhatsApp number
</a>
```

---

### 5. Custom Domain Setup

#### On Vercel:
1. Settings → Domains
2. Add custom domain
3. Follow DNS configuration instructions

#### On Netlify:
1. Domain settings → Add custom domain
2. Update DNS at your registrar

#### On GitHub Pages:
1. Add `CNAME` file to repo with domain name
2. Update DNS CNAME to `username.github.io`

---

## Performance Optimization

### Compress Images (Optional)
1. Use TinyPNG.com or ImageOptim
2. Replace image URLs with optimized versions

### Enable GZIP Compression
- Most hosting auto-enables this
- Verify in browser DevTools → Network

### Set Cache Headers
For GitHub Pages / Vercel: Automatic  
For custom hosting: Ask your hosting provider

### Use a CDN
Recommended: Cloudflare (free tier)
- Add your domain
- Update DNS
- Automatic image optimization & caching

---

## SSL Certificate

### Automatic (Recommended)
- GitHub Pages: Automatic (included)
- Vercel: Automatic (included)
- Netlify: Automatic (included)
- Cloudflare Pages: Automatic (included)

### Manual (Custom Hosting)
- Use Let's Encrypt (free)
- Or purchase from your hosting provider

---

## Troubleshooting

### Site Shows Blank Page
- Clear browser cache (Ctrl+Shift+Del or Cmd+Shift+Del)
- Try different browser
- Check browser console for errors (F12)

### Links Not Working
- Ensure all HTML files are in same directory
- Check file names match exactly (case-sensitive on Linux)

### Images Not Showing
- Verify image URLs are complete
- Check file paths in CSS and HTML
- Ensure images are uploaded

### Contact Form Not Sending
- Check browser console for errors
- Verify Formspree/EmailJS configuration
- Test with different email address

### Site Slow
- Use DevTools to check image sizes
- Compress images with TinyPNG
- Enable GZIP compression

### Mobile Responsive Issues
- Clear browser cache
- Test in Chrome DevTools mobile view
- Try different device sizes

---

## SSL/HTTPS Status
✅ GitHub Pages: HTTPS enabled by default  
✅ Vercel: HTTPS enabled by default  
✅ Netlify: HTTPS enabled by default  
✅ Cloudflare Pages: HTTPS enabled by default  

---

## Monitoring & Analytics

### Monitor Performance
- Vercel Analytics (automatic on Vercel)
- Google Analytics (free - recommended)
- Netlify Analytics (on paid plans)

### Monitor Uptime
- Uptime Robot (free)
- Google Search Console (free)

---

## Security Best Practices

1. ✅ Keep contact form endpoint secret
2. ✅ Enable HTTPS (automatic on all platforms)
3. ✅ Add robots.txt for SEO
4. ✅ Submit sitemap to Google Search Console
5. ✅ Monitor for broken links

---

## Next Steps

1. **Choose a hosting platform** from options above
2. **Upload all files** following platform instructions
3. **Test all pages** and links in production
4. **Set up contact form** integration
5. **Add Google Analytics**
6. **Monitor performance** for first month

---

## Support Resources

- **GitHub Pages Help:** https://pages.github.com/
- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com/
- **Cloudflare Pages:** https://pages.cloudflare.com/
- **HTML/CSS/JS Reference:** https://mdn.mozilla.org/

---

**Website Ready to Deploy! 🚀**

Choose any deployment option above and your Alto Packers & Movers website will be live in minutes.
