# Ashrith H N - Portfolio Website

A modern, responsive portfolio website built with HTML5, CSS3, and JavaScript. Features smooth animations, interactive elements, and a mobile-first design approach.

## 🚀 Features

- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Hover effects, scroll animations, and smooth transitions
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Contact Form**: Functional contact form with validation
- **Performance Optimized**: Debounced scroll events and efficient animations
- **Accessibility**: Semantic HTML and keyboard navigation support

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🎨 Sections

1. **Hero Section**: Eye-catching introduction with call-to-action buttons
2. **About Section**: Personal information, skills, and statistics
3. **Projects Section**: Showcase of recent work with project cards
4. **Contact Section**: Contact information and functional contact form
5. **Footer**: Social links and copyright information

## 🛠️ Customization

### Personal Information
Update the following in `index.html`:
- Name and title in the hero section
- About section content
- Contact information
- Social media links

### Projects
Add your projects in the projects section:
```html
<div class="project-card">
    <div class="project-image">
        <img src="your-image.jpg" alt="Project Name">
        <div class="project-overlay">
            <div class="project-links">
                <a href="live-demo-url" class="project-link">
                    <i class="fas fa-external-link-alt"></i>
                </a>
                <a href="github-url" class="project-link">
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>
    </div>
    <div class="project-content">
        <h3>Project Name</h3>
        <p>Project description...</p>
        <div class="project-tech">
            <span class="tech-tag">Technology</span>
        </div>
    </div>
</div>
```

### Skills
Update skills in the about section:
```html
<div class="skill-item">
    <i class="fab fa-technology-icon"></i>
    <span>Skill Name</span>
</div>
```

### Colors and Styling
Main color variables in `styles.css`:
- Primary: `#4F46E5` (Indigo)
- Secondary: `#FBBF24` (Yellow)
- Background: `#F9FAFB` (Light Gray)
- Text: `#1F2937` (Dark Gray)

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🚀 Getting Started

1. Open `index.html` in your web browser
2. Customize the content with your information
3. Replace placeholder images with your photos
4. Update social media links
5. Deploy to your preferred hosting platform

## 📦 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop your project folder to Netlify
2. Your site will be automatically deployed
3. Custom domain can be added in site settings

### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically deploy on every push
3. Custom domain can be configured in project settings

## 🎯 Performance Tips

- Optimize images before uploading
- Use WebP format for better compression
- Minimize external font usage
- Consider lazy loading for images
- Use a CDN for static assets

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you make improvements, consider sharing them back with the community!

## 📞 Support

If you have any questions or need help customizing your portfolio, feel free to reach out!

---

**Happy coding! 🚀**
