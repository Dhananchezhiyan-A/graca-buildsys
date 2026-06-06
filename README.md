# GRACA BUILDSYS LLP — Corporate Website

Official corporate website for **GRACA BUILDSYS LLP**, a trusted enterprise IT solutions provider offering cloud productivity, infrastructure, networking, security, and AI solutions for modern businesses.

**Tagline:** Innovate | Integrate | Elevate

## Project Overview

This is a static, multi-page corporate website built with semantic HTML5, Bootstrap 5, and vanilla JavaScript. Pages share a consistent layout through reusable HTML includes (navbar and footer) loaded at runtime via `fetch()`.

### Pages

| Page | Description |
|------|-------------|
| `index.html` | Homepage with hero, services overview, stats, testimonials, FAQ, and contact CTA |
| `about.html` | Company profile, values, and team information |
| `services.html` | Solutions overview and service catalog |
| `contact.html` | Contact form, info cards, map placeholder, consultation/quote/demo sections |
| `microsoft365.html` | Microsoft 365 services |
| `google-workspace.html` | Google Workspace services |
| `zoho-mail.html` | Zoho Mail and workplace email |
| `infrastructure.html` | Servers, hardware, printers, and AMC |
| `networking.html` | Internet, connectivity, and networking |
| `security.html` | Firewall, endpoint, and cloud security |
| `ai-solutions.html` | AI chatbots, automation, and generative AI |

## Tech Stack

- **HTML5** — Semantic markup with SEO meta tags and JSON-LD structured data
- **CSS3** — Custom stylesheets (`style.css`, `responsive.css`, `animations.css`)
- **Bootstrap 5.3** — Grid system, components, and responsive utilities
- **JavaScript (ES6+)** — Includes loader, form validation, animations, counters, and Swiper carousels
- **Font Awesome 6** — Icons
- **AOS** — Scroll animations
- **Swiper 11** — Client logos and testimonial carousels
- **PHP** — Contact form handler (`forms/contact-handler.php`)

## Project Structure

```
graca-buildsys/
├── index.html
├── about.html
├── services.html
├── contact.html
├── ai-solutions.html
├── microsoft365.html
├── google-workspace.html
├── zoho-mail.html
├── infrastructure.html
├── networking.html
├── security.html
├── includes/
│   ├── navbar.html
│   └── footer.html
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── forms/
│   └── contact-handler.php
├── docs/
│   ├── sitemap.xml
│   └── robots.txt
└── logs/                  (created at runtime by contact handler)
```

## Local Development Setup

Because navbar and footer are loaded via JavaScript `fetch()`, **you must serve the site through a local HTTP server**. Opening HTML files directly (`file://`) will block include loading due to browser CORS restrictions.

### Option 1: Python (recommended)

```bash
# Python 3
cd graca-buildsys
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000)

### Option 2: Node.js (npx)

```bash
cd graca-buildsys
npx serve .
```

### Option 3: PHP built-in server (for form testing)

```bash
cd graca-buildsys
php -S localhost:8000
```

This also enables testing the contact form handler at `forms/contact-handler.php`.

### Option 4: VS Code / Cursor Live Server

Install the **Live Server** extension and use "Open with Live Server" on `index.html`.

## Contact Form

The contact form submits via AJAX to `forms/contact-handler.php`, which:

1. Validates required fields (name, mobile, email, message)
2. Sends an email to `info@gracabuildsys.com`
3. Logs submissions to `logs/inquiries.log`

Ensure PHP `mail()` is configured on your hosting environment, or replace with an SMTP library (e.g. PHPMailer) for production reliability.

## Deployment Notes

### Web Server

Deploy all files to any web host that supports static files plus PHP (for the contact form):

- **Apache** or **Nginx** on Linux VPS
- Shared hosting (cPanel, Plesk)
- Cloud platforms with PHP runtime

### Apache Configuration

Place `robots.txt` at the site root for crawlers. Either copy `docs/robots.txt` to the root or add a redirect:

```apache
# Copy docs/robots.txt to site root, or alias:
Alias /robots.txt /var/www/gracabuildsys/docs/robots.txt
```

Similarly, expose the sitemap at a crawlable URL. Update `docs/robots.txt` if you move `sitemap.xml` to the root.

### Pre-Deployment Checklist

- [ ] Upload all HTML, assets, includes, forms, and docs
- [ ] Verify PHP is enabled and `mail()` works (or configure SMTP)
- [ ] Ensure `logs/` directory is writable by the web server
- [ ] Copy or alias `robots.txt` and `sitemap.xml` to expected paths
- [ ] Test navbar/footer includes load correctly over HTTPS
- [ ] Test contact form end-to-end
- [ ] Confirm canonical URLs in meta tags match production domain
- [ ] Enable HTTPS with a valid SSL certificate
- [ ] Submit `sitemap.xml` to Google Search Console

### Environment

| Item | Value |
|------|-------|
| Domain | `https://www.gracabuildsys.com` |
| Contact Email | `info@gracabuildsys.com` |
| Phone | `+91 98844 2700` |
| Contact Person | Sugunathan Kumar |

## License

© 2026 GRACA BUILDSYS LLP. All Rights Reserved.
