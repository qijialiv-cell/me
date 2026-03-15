# Academic Job Market Website

A professional, single-page academic website designed for job market candidates targeting postdoc positions and teaching-focused assistant professor roles in Marketing.

## Features

- **Single-page design** with smooth scroll navigation
- **Responsive layout** - looks great on mobile devices (important for search committees)
- **Fast loading** - no build tools, no frameworks, just plain HTML/CSS/JS
- **Professional design** - clean typography with serif display fonts
- **GitHub Pages ready** - deploy with just 3 commands
- **Accessible** - proper semantic HTML and keyboard navigation

## Quick Start

### 1. Deploy to GitHub Pages (3 commands)

```bash
# Add all files to git
git add .

# Commit changes
git commit -m "Initial commit: Academic website"

# Push to GitHub
git push origin main
```

Then enable GitHub Pages in your repository settings:
- Go to Settings → Pages
- Source: Deploy from a branch
- Branch: main / (root)
- Save

Your site will be live at: `https://yourusername.github.io/repository-name/`

### 2. Local Development

Simply open `index.html` in your browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (if you have http-server installed)
npx http-server

# Then visit http://localhost:8000
```

## Project Structure

```
Qijia_academic_website/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   └── script.js       # Interactivity and animations
├── assets/
│   ├── README.md       # Asset instructions
│   └── cv.pdf          # Your CV (replace placeholder)
└── README.md           # This file
```

## How to Update Each Section

### 1. Update Personal Information (index.html)

**Lines to edit: 20-35** - Page title and meta description
```html
<title>Your Name | PhD Candidate in Marketing</title>
<meta name="description" content="Your site description">
```

**Line 52** - Navigation logo (your initials)
```html
<a href="#about" class="nav-logo">Your Initials</a>
```

**Lines 70-72** - About section photo placeholder
```html
<!-- Replace with: <img src="assets/photo.jpg" alt="Your Name" class="profile-photo"> -->
<div class="photo-placeholder">
    <i class="fas fa-user"></i>
</div>
```

**Lines 74-75** - Your name and title
```html
<h1 class="section-title">Your Name</h1>
<h2 class="section-subtitle">Your Title | Your University</h2>
```

**Lines 77-83** - Research identity statement
```html
<p class="research-identity">
    Your 2-3 sentence research identity statement extracted from your research statement.
</p>
```

**Lines 86-90** - Social links
```html
<a href="#cv" class="btn btn-primary"><i class="fas fa-file-pdf"></i> Download CV</a>
<a href="https://scholar.google.com/citations?user=YOUR_ID" target="_blank">Google Scholar</a>
<a href="https://linkedin.com/in/YOUR_PROFILE" target="_blank">LinkedIn</a>
<a href="mailto:your.email@university.edu">Email</a>
```

### 2. Update Research Section (index.html)

**Lines 113-127** - Job Market Paper
```html
<h4 class="paper-title">
    <span class="badge badge-jmp">Job Market Paper</span>
    Your Paper Title
</h4>
<p class="paper-coauthors">with Coauthor Name(s)</p>
<p class="paper-abstract">One-sentence abstract</p>
<div class="paper-links">
    <a href="assets/paper1.pdf" class="paper-link"><i class="fas fa-file-pdf"></i> PDF</a>
    <a href="YOUR_SSRN_LINK" class="paper-link"><i class="fas fa-external-link-alt"></i> SSRN</a>
</div>
<div class="paper-full-abstract">
    <p>Full abstract details...</p>
</div>
```

**Lines 132-173** - Working Papers (repeat for each paper)
```html
<div class="research-paper">
    <div class="paper-header">
        <h4 class="paper-title">
            <span class="badge badge-review">Under Review</span>
            <!-- or: <span class="badge badge-working">Working Paper</span> -->
            Your Paper Title
        </h4>
        <p class="paper-coauthors">with Coauthor Name(s)</p>
    </div>
    <!-- ... rest of paper details ... -->
</div>
```

### 3. Update Teaching Section (index.html)

**Lines 183-187** - Teaching philosophy
```html
<p class="philosophy-text">
    Extract 2-3 sentences from your teaching statement that summarize your approach.
</p>
```

**Lines 195-211** - Teaching experience (repeat for each course)
```html
<div class="teaching-course">
    <h4 class="course-title">Course Name</h4>
    <div class="course-details">
        <span class="course-level">Undergraduate/Graduate</span>
        <span class="course-enrollment">~X students</span>
        <span class="course-semester">Semester Year</span>
    </div>
    <p class="course-description">Your role and responsibilities</p>
</div>
```

**Lines 216-225** - Teaching evaluations
```html
<div class="evaluation-score">
    <span class="score-label">Average Score:</span>
    <span class="score-value">4.5/5.0</span>
</div>
<blockquote class="student-quote">
    "Student feedback quote here"
</blockquote>
```

**Lines 230-237** - Teaching effectiveness evidence
```html
<ul class="evidence-list">
    <li>Guest lectures on X topic</li>
    <li>Course development for Y</li>
    <li>Teaching award/recognition</li>
</ul>
```

### 4. Update CV (assets/cv.pdf)

Simply replace the placeholder `assets/cv.pdf` with your actual CV PDF file.

### 5. Update Contact Information (index.html)

**Lines 250-260** - Contact details
```html
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <a href="mailto:your.email@university.edu">your.email@university.edu</a>
</div>
<div class="contact-item">
    <i class="fas fa-university"></i>
    <span>Your Department, Your University</span>
</div>
<div class="contact-item">
    <i class="fas fa-map-marker-alt"></i>
    <span>Your Address</span>
</div>
```

**Lines 263-267** - Job market status
```html
<span class="status-badge status-available">
    <i class="fas fa-check-circle"></i>
    Available for the 2025–2026 academic job market
</span>
```

## Customization Options

### Change Color Scheme (css/style.css)

Edit the CSS variables at the top of `css/style.css`:

```css
:root {
    /* Change accent color */
    --color-accent: #0d6e6e;  /* Try: #7c2d3e for burgundy */
    --color-accent-light: #1a9d9d;
    --color-accent-dark: #085858;
}
```

### Change Fonts (index.html)

Edit the Google Fonts link in `<head>`:

```html
<!-- Current: Cormorant Garamond + Source Sans 3 -->
<!-- Try: Playfair Display + DM Sans -->
<!-- Try: Merriweather + Lato -->
<link href="https://fonts.googleapis.com/css2?family=YOUR+FONTS&display=swap" rel="stylesheet">
```

Then update the CSS variables in `css/style.css`:

```css
:root {
    --font-display: 'Your Display Font', Georgia, serif;
    --font-body: 'Your Body Font', Arial, sans-serif;
}
```

## Add a Custom Domain

### Option 1: GitHub Pages with Custom Domain

1. **Purchase a domain** from any registrar (e.g., Namecheap, GoDaddy)

2. **Configure DNS settings** at your registrar:
   - Add an A record pointing to `185.199.108.153`
   - Add an A record pointing to `185.199.109.153`
   - Add an A record pointing to `185.199.110.153`
   - Add an A record pointing to `185.199.111.153`
   - (or add a CNAME record pointing to `yourusername.github.io`)

3. **Update GitHub repository settings**:
   - Go to Settings → Pages
   - Under "Custom domain", enter your domain (e.g., `yourname.com`)
   - Check "Enforce HTTPS"
   - Save

4. **Wait** - DNS propagation can take up to 48 hours

### Option 2: Subdomain (e.g., www.yourname.com)

Follow the same steps, but add a CNAME record:
- Type: CNAME
- Name: www
- Value: `yourusername.github.io`

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. **Optimize images**: Compress photos before uploading
2. **Limit CV size**: Keep CV under 5MB
3. **Use CDN links**: Google Fonts and Font Awesome are already optimized
4. **Enable HTTPS**: Available for free on GitHub Pages

## Troubleshooting

### Site not updating after changes?
- Clear your browser cache
- Force refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Check if GitHub Pages finished deploying (may take 1-2 minutes)

### CV not displaying?
- Ensure your CV is named exactly `cv.pdf`
- Check file size (under 5MB recommended)
- Verify the file is in the `assets/` folder

### Mobile menu not working?
- Ensure JavaScript is enabled in your browser
- Check browser console for errors (F12 → Console)

## Support

For issues or questions:
1. Check this README first
2. Review browser console for errors
3. Ensure all file paths are correct
4. Verify GitHub Pages is enabled in repository settings

---

**Built with**: Plain HTML, CSS, and JavaScript - No build tools required!