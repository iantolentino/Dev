# Ian Tolentino - Portfolio Website

A modern, responsive portfolio website showcasing 50+ projects across web development, desktop applications, browser extensions, and automation tools. Built with a clean, GitHub-inspired dark theme and fully responsive design.

## 🚀 Features

- **Modern Design**: GitHub-inspired dark theme with glassmorphism effects
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Project Showcase**: 52+ projects with filtering and categorization
- **Professional Layout**: Clean, organized sections for skills, experience, and contact information
- **Interactive Elements**: Smooth animations, hover effects, and mobile navigation
- **Accessibility**: ARIA labels and keyboard navigation support

## 📁 Project Structure

``` 
portfolio/
├── index.html          # About Me (Homepage)
├── projects.html       # Projects showcase (52 projects)
├── skills.html         # Technical skills and proficiencies
├── experience.html     # Professional experience and education
├── styles.css          # Main stylesheet
├── main.js             # JavaScript functionality
└── assets/
    └── favicon.png     # Site favicon
```

## 🛠 Technologies Used

### Frontend
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript** - DOM manipulation, filtering, mobile navigation

### Frameworks & Libraries
- **Pure CSS** - No external frameworks (custom design system)
- **Vanilla JavaScript** - No external dependencies

### Development Tools
- **Git** - Version control
- **VS Code** - Development environment
- **Responsive Design** - Mobile-first approach

## 🎨 Design System

### Color Palette
- `--bg: #0d1117` - Main background
- `--panel: #0f1724` - Card backgrounds
- `--accent: #58a6ff` - Primary accent color
- `--text: #e6eef8` - Primary text
- `--muted: #98a0aa` - Secondary text

### Typography
- **Font Family**: Inter, system fonts
- **Font Weights**: 400 (regular), 600 (semibold), 800 (bold)

### Components
- Glassmorphism cards with hover effects
- Responsive grid layouts
- Animated transitions and micro-interactions
- Mobile-friendly navigation

## 📱 Pages Overview

### 1. About Me (`index.html`)
- Personal introduction and bio
- Quick stats (50+ projects, 3+ years experience)
- Featured projects showcase
- Competitions & achievements
- Call-to-action buttons

### 2. Projects (`projects.html`)
- **52 projects** with detailed descriptions
- **Filtering system** by technology and category
- **Pagination** for better performance
- **GitHub links** and star ratings
- **Technology tags** for each project

### 3. Skills (`skills.html`)
- Technical skills with proficiency levels
- Frameworks & libraries
- Project statistics
- Currently learning section

### 4. Experience (`experience.html`)
- Professional work experience
- Education background
- Technical skills summary
- Detailed achievement lists

### 5. Contact (`contact.html`)
- Contact information
- Interactive contact form
- Social links and availability status

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local server for development (optional)

### Installation

1. **Clone or Download**
   ```bash
   git clone [repository-url]
   cd portfolio
   ```

2. **Local Development**
   - Open `index.html` in your browser, or
   - Use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Customization**
   - Update personal information in HTML files
   - Modify colors in `:root` CSS variables
   - Add your own projects to `projects.html`
   - Replace favicon in `assets/` folder

## 🎯 Key Features Explained

### Project Filtering System
- Filter by technology (Web, Python, Extensions, etc.)
- Real-time project count updates
- Load more functionality for performance

### Responsive Navigation
- Desktop: Centered navigation bar
- Mobile: Hamburger menu with smooth animations
- Accessible with ARIA labels

### Performance Optimizations
- CSS Grid and Flexbox for layouts
- Efficient JavaScript event handling
- Optimized images and assets

## 📊 Project Categories

The portfolio showcases projects across multiple categories:

- **Web Applications** (18 projects)
- **Python Desktop Apps** (28 projects) 
- **Browser Extensions** (8 projects)
- **Automation Tools**
- **CLI Utilities**
- **Productivity Apps**
- **Security Tools**

## 🔧 Customization Guide

### Updating Personal Information
1. Edit `index.html` - Update name, bio, and introduction
2. Modify `contact.html` - Update contact details and social links
3. Update `experience.html` - Add your professional experience

### Adding New Projects
1. Copy project card template in `projects.html`
2. Add appropriate category tags in `data-category` attribute
3. Update project count in the filter system

### Styling Changes
1. Modify CSS variables in `:root` section of `styles.css`
2. Update color scheme, spacing, or typography
3. Add new component styles as needed

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Ian Tolentino**
- Email: iantolentino0110@gmail.com
- GitHub: [github.com/iantolentino](https://github.com/iantolentino)
- Location: Mabalacat, Pampanga, Philippines

## 🚀 Deployment

### Static Hosting Options
- **GitHub Pages**: Free hosting for static sites
- **Netlify**: Continuous deployment from Git
- **Vercel**: Fast deployment with Git integration
- **Traditional Web Hosting**: Upload via FTP/SFTP

### GitHub Pages Deployment
1. Push code to GitHub repository
2. Go to Repository Settings → Pages
3. Select branch to deploy (usually `main` or `gh-pages`)
4. Access site at `https://username.github.io/repository-name`
