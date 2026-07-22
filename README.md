# Alto Packers & Movers - Premium Website

A modern, responsive, and premium multi-page website for Alto Packers & Movers built with vanilla HTML, CSS, and JavaScript.

## Features

### Pages
1. **index.html** - Homepage with hero video, services teaser, animated stats, testimonials, gallery, and CTAs
2. **about.html** - Company story, mission & values, why choose us, detailed company features
3. **services.html** - 7 comprehensive service sections with detailed descriptions
4. **service-areas.html** - Vadodara headquarters, Gujarat coverage, city-specific information with modal details
5. **contact.html** - Contact form with real-time validation, contact info, interactive map, FAQ accordion

### Design Elements
- **Color Palette**: Deep Navy (#0B1120) + Warm Gold (#D4A94E) + Clean Off-White (#F8F7F4)
- **Typography**: Sora (headings) + Inter (body) from Google Fonts
- **Responsive**: Mobile-first design optimized for 375px, 768px, 1024px, and 1440px breakpoints
- **Premium Interactions**: Smooth animations, parallax effects, scroll reveals, staggered card animations

### Advanced Features
✅ **Sticky Header** - Transparent on home hero, solid on inner pages, blurred on scroll  
✅ **Hero Parallax** - Subtle zoom effect as user scrolls (homepage only)  
✅ **Staggered Animations** - Service cards, testimonials, and city cards fade in with delays  
✅ **Gold Glow Effects** - Icon badges with subtle pulsing glow animation  
✅ **Form Validation** - Real-time email/phone validation with inline error messages  
✅ **City Modals** - Click any city card to see tailored descriptions  
✅ **Animated Stats** - Count-up numbers when stats scroll into view  
✅ **FAQ Accordion** - Smooth expand/collapse with height animations  
✅ **Video Modal** - Click "Watch How We Work" for full-screen video playback  
✅ **WhatsApp Widget** - Fixed floating button for quick WhatsApp access  
✅ **Fully Accessible** - Semantic HTML, ARIA labels, proper contrast ratios  

## File Structure

```
alto-packers-website/
├── index.html              # Homepage
├── about.html              # About page
├── services.html           # Services page
├── service-areas.html      # Service areas page
├── contact.html            # Contact page
├── style.css               # Unified stylesheet (2300+ lines)
├── script.js               # JavaScript interactions (500+ lines)
└── README.md               # This file
```

## Setup & Deployment

### Local Testing
1. Extract the ZIP file
2. Open any HTML file in a web browser (all pages work locally)
3. Or serve with a simple HTTP server:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```
4. Visit `http://localhost:8000` in your browser

### Deploy to GitHub Pages
1. Create a new GitHub repository named `alto-packers-movers`
2. Push all files to the `main` branch
3. Go to Settings → Pages → Select `main` branch as source
4. Your site will be live at `https://yourusername.github.io/alto-packers-movers`

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect and deploy
3. Choose a domain and deploy

### Deploy to Netlify
1. Drag and drop the folder into Netlify
2. Or connect your GitHub repository
3. Netlify will auto-deploy on every push

### Deploy to Traditional Hosting
1. Upload all files via FTP to your web hosting
2. Keep the file structure intact
3. Access via your domain

## Customization

### Update Contact Information
Edit the following in all HTML files:
- Phone: `+91 8000709840` → Your phone number
- Address: `221 - Aristo, Kabir Road, Vadodara` → Your address
- Email links and footer contact info

### Modify Colors
Edit these CSS variables in `style.css`:
```css
--color-dark: #0B1120;          /* Main navy */
--color-accent: #D4A94E;        /* Gold accent */
--color-light: #F8F7F4;         /* Off-white background */
```

### Update Hero Video
In `index.html`, change the video source:
```html
<video class="hero__video" autoplay muted loop playsinline>
  <source src="YOUR_VIDEO_URL.mp4" type="video/mp4">
</video>
```

### Add Social Media Links
Update the footer in all HTML files to include your social media links.

### Connect Contact Form
The form currently logs to console. To send emails, integrate with:
- **Formspree** - Easiest option, no backend needed
- **Getform** - Similar to Formspree
- **EmailJS** - Client-side email sending
- **Your own backend** - Node.js, Python, etc.

See the TODO comment in `script.js` for integration instructions.

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance
- Zero external dependencies (no frameworks, no jQuery)
- ~60KB total CSS
- ~20KB total JavaScript
- Optimized images (lazy loading ready)
- Smooth 60fps animations

## SEO Features
- Meta descriptions on every page
- Open Graph tags for social sharing
- Semantic HTML structure
- Mobile-first responsive design
- Fast load times

## Accessibility
- Full keyboard navigation
- ARIA labels on interactive elements
- Proper heading hierarchy
- Color contrast meets WCAG AA standards
- Screen reader optimized

## Future Enhancements
- [ ] Backend contact form integration
- [ ] Customer testimonials admin panel
- [ ] Blog/News section
- [ ] Real-time chat support
- [ ] Mobile app promotion
- [ ] Service booking system
- [ ] Customer portal
- [ ] Multi-language support

## License
This website template is provided as-is for Alto Packers & Movers.

## Support
For issues or customization requests, contact your web developer.

---

**Last Updated**: July 22, 2026  
**Version**: 1.0 Premium Edition  
**Built with**: HTML5, CSS3, Vanilla JavaScript  
