/**
 * main.js - Core functionality for Ian Tolentino Portfolio
 * Handles theme management, navigation, and global interactions
 * @author Ian Tolentino
 * @version 2.0.0
 */

// ============================================
// Immediately Invoked Function Expression (IIFE)
// Prevents global scope pollution
// ============================================
(function() {
    'use strict';

    // ============================================
    // Theme Management
    // Handles dark/light theme switching with localStorage persistence
    // ============================================
    
    /**
     * Initialize theme from localStorage or system preference
     */
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        
        if (!savedTheme) {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
            localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
        } else {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
        
        // Update theme switch UI after DOM is ready
        setTimeout(updateThemeSwitch, 100);
    }

    /**
     * Toggle between dark and light themes
     */
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeSwitch();
        
        // Dispatch event for other components that need to react to theme change
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
    }

    /**
     * Update theme switch checkbox state
     */
    function updateThemeSwitch() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const switchInput = document.querySelector('.theme-switch input');
        
        if (switchInput) {
            switchInput.checked = currentTheme === 'dark';
        }
    }

    // ============================================
    // Navigation Management
    // Highlights active page in navigation
    // ============================================
    
    /**
     * Set active navigation item based on current page
     */
    function setActiveNavigation() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
                
                // Add aria-current for accessibility
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    // ============================================
    // Accessibility Enhancements
    // Improves keyboard navigation and screen reader support
    // ============================================
    
    /**
     * Enhance skill icons with keyboard accessibility
     */
    function enhanceSkillIcons() {
        document.querySelectorAll('.skill-icon[tabindex]').forEach(el => {
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    
                    const tip = el.querySelector('.tooltip');
                    if (tip) {
                        // Show tooltip temporarily
                        tip.style.opacity = '1';
                        tip.style.transform = 'translateX(-50%) translateY(0)';
                        
                        setTimeout(() => {
                            tip.style.opacity = '';
                            tip.style.transform = '';
                        }, 1200);
                    }
                }
            });
        });
    }

    /**
     * Add smooth scrolling for anchor links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId !== '#') {
                    const target = document.querySelector(targetId);
                    
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Update URL without jumping
                        history.pushState(null, null, targetId);
                    }
                }
            });
        });
    }

    /**
     * Add animation delays to cards for staggered effect
     */
    function addCardAnimations() {
        document.querySelectorAll('.grid .card, .grid-4 .card').forEach((card, index) => {
            card.style.setProperty('--i', index);
            card.style.animation = `fadeUp 0.4s both`;
            card.style.animationDelay = `${index * 0.05}s`;
        });
    }

    // ============================================
    // Header Loading
    // Dynamically loads header from includes/header.html
    // ============================================
    
    /**
     * Load header HTML into page
     */
    function loadHeader() {
        const headerContainer = document.getElementById('site-header');
        
        if (!headerContainer) return;
        
        // Try to fetch from external file first
        fetch('includes/header.html')
            .then(response => {
                if (!response.ok) throw new Error('Header file not found');
                return response.text();
            })
            .then(html => {
                headerContainer.innerHTML = html;
                afterHeaderLoad();
            })
            .catch(() => {
                // Fallback to inline header HTML
                const headerHtml = getInlineHeaderHtml();
                headerContainer.innerHTML = headerHtml;
                afterHeaderLoad();
            });
    }

    /**
     * Get inline header HTML as fallback
     * @returns {string} Header HTML
     */
    function getInlineHeaderHtml() {
        return `
            <div class="container header">
                <nav class="primary" aria-label="Primary navigation">
                    <a href="index.html" class="home-button">
                        <img src="assets/favicon.png" alt="Home" class="home-icon">
                    </a>
                    <div class="nav-links">
                        <a href="index.html">
                            <img src="assets/home.png" alt="Home" class="nav-icon">
                            <span class="nav-text">Home</span>
                        </a>
                        <a href="about.html">
                            <img src="assets/about.png" alt="About Me" class="nav-icon">
                            <span class="nav-text">About</span>
                        </a>
                        <a href="projects.html">
                            <img src="assets/projects.png" alt="Projects" class="nav-icon">
                            <span class="nav-text">Projects</span>
                        </a>
                        <a href="skills.html">
                            <img src="assets/skills.png" alt="Skills" class="nav-icon">
                            <span class="nav-text">Skills</span>
                        </a>
                        <a href="expertise.html">
                            <img src="assets/experience.png" alt="Experience" class="nav-icon">
                            <span class="nav-text">Experience</span>
                        </a>
                    </div>
                </nav>
                <div class="header-controls">
                    <div class="theme-switch-container">
                        <label class="theme-switch">
                            <input type="checkbox" aria-label="Toggle dark/light theme">
                            <span class="slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        `;
    }
    

    /**
     * Initialize header after it's loaded
     */
    function afterHeaderLoad() {
        // Re-initialize theme switch event listener
        const themeSwitch = document.querySelector('.theme-switch');
        
        if (themeSwitch) {
            const checkbox = themeSwitch.querySelector('input');
            
            // Remove existing listeners to prevent duplicates
            checkbox.removeEventListener('change', toggleTheme);
            checkbox.addEventListener('change', toggleTheme);
            
            updateThemeSwitch();
        }
        
        // Set active navigation item
        setActiveNavigation();
        
        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('headerLoaded'));
    }

    // ============================================
    // Initialize on DOM Content Loaded
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize theme first (prevents flash)
        initTheme();
        
        // Load header
        loadHeader();
        
        // Initialize other features
        enhanceSkillIcons();
        initSmoothScroll();
        addCardAnimations();
        
        // Set active navigation (will run again after header loads)
        setTimeout(setActiveNavigation, 200);
    });

    // ============================================
    // Handle window resize events
    // ============================================
    let resizeTimeout;
    window.addEventListener('resize', () => {
        // Debounce resize events
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate any responsive layouts if needed
            window.dispatchEvent(new CustomEvent('resizeEnded'));
        }, 250);
    });

})();

