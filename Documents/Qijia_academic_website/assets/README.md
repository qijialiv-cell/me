# Assets Folder

This folder contains the static assets for your academic website.

## Required Files

### 1. CV (Required)
- **Filename**: `cv.pdf`
- **Description**: Your academic curriculum vitae in PDF format
- **Usage**: Displayed in the CV section and available for download
- **How to add**: Place your CV file here and rename it to `cv.pdf`

### 2. Professional Photo (Optional)
- **Filename**: `photo.jpg` or `photo.png`
- **Description**: Professional headshot for your website
- **Dimensions**: Recommended 400x400 pixels (will be displayed as 180x180 circular)
- **Format**: JPG or PNG
- **Usage**: Replace the placeholder in the About section

## How to Update Your Photo

1. Take or obtain a professional headshot photo
2. Resize to approximately 400x400 pixels (recommended but not required)
3. Save as `photo.jpg` or `photo.png` in this assets folder
4. Update the photo placeholder in `index.html`:

```html
<!-- Replace this placeholder -->
<div class="photo-placeholder">
    <i class="fas fa-user"></i>
</div>

<!-- With this image tag -->
<img src="assets/photo.jpg" alt="Qijia Liao" class="profile-photo">
```

## How to Update Your CV

1. Export your CV as a PDF file
2. Save it as `cv.pdf` in this assets folder
3. The website will automatically display it in the CV section

## File Size Guidelines

- **CV PDF**: Keep under 5MB for faster loading
- **Photo**: Keep under 1MB for optimal performance

## Additional Assets (Optional)

You can add other assets here as needed, such as:
- Publication PDFs
- Presentation slides
- Research images
- Teaching materials

Remember to update the file paths in `index.html` if you add additional assets.