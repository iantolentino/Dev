/**
 * expertise-tabs.js - Tab functionality for expertise page
 * @author Ian Tolentino
 * @version 1.0.0
 */

(function() {
    'use strict';

    /**
     * Initialize tab functionality
     */
    function initTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        if (tabButtons.length === 0) return;

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');

                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const targetContent = document.getElementById(tabId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }

                // Save active tab to localStorage
                localStorage.setItem('activeTab', tabId);
            });
        });

        // Restore active tab from localStorage
        const savedTab = localStorage.getItem('activeTab');
        if (savedTab) {
            const savedButton = document.querySelector(`[data-tab="${savedTab}"]`);
            if (savedButton) {
                savedButton.click();
            }
        }
    }

    /**
     * Animate skill bars on scroll
     */
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observer.observe(bar));
    }

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        initTabs();
        animateSkillBars();
    });
})();