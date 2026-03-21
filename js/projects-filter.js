/**
 * projects-filter.js - Filter functionality for projects page
 * @author Ian Tolentino
 * @version 4.1.0 - Fixed filter counts sync
 */

(function() {
    'use strict';

    // Store current state
    let currentFilter = 'all';
    let allProjectCards = [];
    let projectsGrid = null;
    let filterButtons = [];

    /**
     * Initialize project filters
     */
    function initProjectFilters() {
        console.log('🔧 Initializing project filters...');
        
        projectsGrid = document.getElementById('github-projects-grid');
        filterButtons = document.querySelectorAll('.filter-btn');
        
        if (filterButtons.length === 0) {
            console.warn('⚠️ No filter buttons found');
            return;
        }

        // Remove any existing event listeners and add new ones
        filterButtons.forEach(button => {
            // Remove old listeners by cloning and replacing
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
        });

        // Get fresh references after cloning
        filterButtons = document.querySelectorAll('.filter-btn');
        
        // Add click handlers to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', handleFilterClick);
            console.log(`✅ Filter button added: ${button.getAttribute('data-filter')}`);
        });

        // Listen for projects loaded event
        window.addEventListener('projectsLoaded', function(event) {
            console.log('📦 Projects loaded event received');
            
            // Give DOM time to update
            setTimeout(() => {
                collectProjectCards();
                
                // Update all filter counts after projects are loaded
                updateAllFilterCounts();
                
                // Check URL hash for initial filter
                const hashFilter = window.location.hash.substring(1);
                if (hashFilter) {
                    const button = document.querySelector(`[data-filter="${hashFilter}"]`);
                    if (button) {
                        console.log(`🔍 Applying hash filter: ${hashFilter}`);
                        button.click();
                    } else {
                        // Apply default filter
                        applyFilter('all');
                    }
                } else {
                    // Apply default filter
                    applyFilter('all');
                }
            }, 300);
        });

        // Check if projects are already loaded
        checkForExistingProjects();

        console.log('✅ Project filters initialized');
    }

    /**
     * Update all filter counts (desktop and mobile)
     */
    function updateAllFilterCounts() {
        if (allProjectCards.length === 0) return;
        
        // Calculate counts for each category
        const counts = calculateCategoryCounts();
        
        console.log('📊 Updating filter counts:', counts);
        
        // Update desktop filter buttons
        filterButtons.forEach(btn => {
            const filter = btn.getAttribute('data-filter');
            const count = counts[filter] || 0;
            
            // Get or create count span
            let countSpan = btn.querySelector('.filter-count');
            if (!countSpan) {
                countSpan = document.createElement('span');
                countSpan.className = 'filter-count';
                btn.appendChild(countSpan);
            }
            countSpan.textContent = `(${count})`;
        });
        
        // Update mobile dropdown filter options
        const filterOptions = document.querySelectorAll('.filter-option');
        filterOptions.forEach(option => {
            const filter = option.getAttribute('data-filter');
            const count = counts[filter] || 0;
            
            let countSpan = option.querySelector('.filter-count');
            if (!countSpan) {
                countSpan = document.createElement('span');
                countSpan.className = 'filter-count';
                option.appendChild(countSpan);
            }
            countSpan.textContent = `${count}`;
        });
        
        // Also update the specific count elements by ID if they exist
        const countMapping = {
            'allCount': counts.all || 0,
            'webAppsCount': counts['web-apps'] || 0,
            'pythonCount': counts.python || 0,
            'desktopCount': counts.desktop || 0,
            'extensionsCount': counts.extensions || 0,
            'automationCount': counts.automation || 0,
            'utilitiesCount': counts.utilities || 0,
            'mobileAllCount': counts.all || 0,
            'mobileWebAppsCount': counts['web-apps'] || 0,
            'mobilePythonCount': counts.python || 0,
            'mobileDesktopCount': counts.desktop || 0,
            'mobileExtensionsCount': counts.extensions || 0,
            'mobileAutomationCount': counts.automation || 0,
            'mobileUtilitiesCount': counts.utilities || 0
        };
        
        Object.keys(countMapping).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = countMapping[id];
            }
        });
    }

    /**
     * Calculate category counts from project cards
     */
    function calculateCategoryCounts() {
        const counts = {
            'all': allProjectCards.length,
            'web-apps': 0,
            'python': 0,
            'desktop': 0,
            'extensions': 0,
            'automation': 0,
            'utilities': 0
        };
        
        allProjectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (counts.hasOwnProperty(category)) {
                counts[category]++;
            } else {
                // Handle any unknown categories
                console.warn(`Unknown category: ${category}`);
            }
        });
        
        return counts;
    }

    /**
     * Check if projects are already in the DOM
     */
    function checkForExistingProjects() {
        setTimeout(() => {
            if (projectsGrid) {
                const cards = projectsGrid.querySelectorAll('.project-card');
                if (cards.length > 0) {
                    console.log(`📊 Found ${cards.length} existing project cards`);
                    collectProjectCards();
                    updateAllFilterCounts();
                    applyFilter(currentFilter);
                }
            }
        }, 1000);
    }

    // Mobile filter dropdown functionality
    function initMobileDropdown() {
        const dropdownToggle = document.getElementById('filterDropdownToggle');
        const dropdownMenu = document.getElementById('filterDropdownMenu');
        const filterOptions = document.querySelectorAll('.filter-option');
        const desktopFilterBtns = document.querySelectorAll('.filter-btn');
        
        // Toggle dropdown
        if (dropdownToggle) {
            dropdownToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('active');
                dropdownMenu.classList.toggle('show');
            });
        }
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (dropdownToggle && dropdownMenu) {
                if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                    dropdownToggle.classList.remove('active');
                    dropdownMenu.classList.remove('show');
                }
            }
        });
        
        // Handle filter option selection
        filterOptions.forEach(option => {
            option.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update active state in dropdown
                filterOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Update active state in desktop filters
                desktopFilterBtns.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.filter === filter) {
                        btn.classList.add('active');
                    }
                });
                
                // Update dropdown button text
                if (dropdownToggle) {
                    const selectedIcon = this.querySelector('i')?.outerHTML || '';
                    const selectedText = this.querySelector('span:first-child')?.innerHTML || this.textContent;
                    dropdownToggle.innerHTML = `<span><i class="fas fa-filter"></i> ${selectedText}</span> <i class="fas fa-chevron-down"></i>`;
                }
                
                // Close dropdown
                if (dropdownToggle) dropdownToggle.classList.remove('active');
                if (dropdownMenu) dropdownMenu.classList.remove('show');
                
                // Trigger filter function
                applyFilter(filter);
            });
        });
    }

    /**
     * Collect all project cards from the grid
     */
    function collectProjectCards() {
        if (!projectsGrid) {
            projectsGrid = document.getElementById('github-projects-grid');
        }
        
        if (!projectsGrid) return;
        
        // Get all project cards
        allProjectCards = Array.from(document.querySelectorAll('.project-card'));
        
        if (allProjectCards.length === 0) {
            console.warn('⚠️ No project cards found');
            return;
        }
        
        console.log(`✅ Collected ${allProjectCards.length} project cards`);
        
        // Log categories for debugging
        const categories = {};
        allProjectCards.forEach(card => {
            const cat = card.getAttribute('data-category');
            categories[cat] = (categories[cat] || 0) + 1;
        });
        console.log('📊 Project categories:', categories);
        
        // Make cards clickable
        makeCardsClickable();
    }

    /**
     * Make project cards clickable
     */
    function makeCardsClickable() {
        allProjectCards.forEach(card => {
            // Remove existing listener to prevent duplicates
            card.removeEventListener('click', handleCardClick);
            // Add new listener
            card.addEventListener('click', handleCardClick);
            
            // Add cursor style
            card.style.cursor = 'pointer';
            
            // Add title attribute for better UX
            const url = card.getAttribute('data-url');
            if (url) {
                card.setAttribute('title', 'Click to view on GitHub');
            }
        });
        
        console.log('👆 Made cards clickable');
    }

    /**
     * Handle project card click
     */
    function handleCardClick(event) {
        // Don't navigate if clicking on a link or tag inside the card
        if (event.target.tagName === 'A' || 
            event.target.classList.contains('tech-tag') ||
            event.target.classList.contains('category-badge') ||
            event.target.closest('a')) {
            return;
        }
        
        const url = this.getAttribute('data-url');
        if (url) {
            window.open(url, '_blank');
        }
    }

    /**
     * Handle filter button click
     */
    function handleFilterClick(event) {
        const button = event.currentTarget;
        const filter = button.getAttribute('data-filter');
        
        console.log('🎯 Filter clicked:', filter);
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update mobile dropdown active state
        const mobileOptions = document.querySelectorAll('.filter-option');
        mobileOptions.forEach(opt => {
            if (opt.getAttribute('data-filter') === filter) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
        
        // Update dropdown button text
        const dropdownToggle = document.getElementById('filterDropdownToggle');
        if (dropdownToggle) {
            const activeMobileOption = document.querySelector(`.filter-option[data-filter="${filter}"]`);
            if (activeMobileOption) {
                const selectedText = activeMobileOption.querySelector('span:first-child')?.innerHTML || activeMobileOption.textContent;
                dropdownToggle.innerHTML = `<span><i class="fas fa-filter"></i> ${selectedText}</span> <i class="fas fa-chevron-down"></i>`;
            }
        }
        
        // Apply filter
        applyFilter(filter);
        
        // Update URL hash
        window.location.hash = filter;
    }

    /**
     * Apply filter to projects
     */
    function applyFilter(filter) {
        currentFilter = filter;
        
        if (allProjectCards.length === 0) {
            console.log('⚠️ No project cards to filter');
            // Try to collect them again
            collectProjectCards();
            if (allProjectCards.length === 0) return;
        }

        console.log(`🔍 Filtering projects by: ${filter}`);
        
        let visibleCount = 0;
        
        allProjectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            // Match exactly
            const matches = filter === 'all' || cardCategory === filter;
            
            if (matches) {
                card.style.display = 'flex';
                card.style.opacity = '1';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        console.log(`✅ Showing ${visibleCount} projects`);
        
        // Show/hide no projects message
        handleNoProjectsMessage(visibleCount === 0);
    }

    /**
     * Handle no projects message
     */
    function handleNoProjectsMessage(show) {
        if (!projectsGrid) return;
        
        const existingMsg = projectsGrid.querySelector('.no-projects-message');
        
        if (show) {
            if (!existingMsg) {
                const msg = document.createElement('div');
                msg.className = 'no-projects-message';
                msg.innerHTML = `
                    <i class="fas fa-folder-open"></i>
                    <p>No projects found in this category</p>
                    <button class="clear-filter-btn">View All Projects</button>
                `;
                projectsGrid.appendChild(msg);
                
                // Add click handler to clear filter button
                const clearBtn = msg.querySelector('.clear-filter-btn');
                if (clearBtn) {
                    clearBtn.addEventListener('click', () => {
                        const allBtn = document.querySelector('[data-filter="all"]');
                        if (allBtn) allBtn.click();
                    });
                }
            }
        } else {
            if (existingMsg) {
                existingMsg.remove();
            }
        }
    }

    /**
     * Reset filters to show all projects
     */
    function resetFilters() {
        const allBtn = document.querySelector('[data-filter="all"]');
        if (allBtn) {
            allBtn.click();
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                initProjectFilters();
                initMobileDropdown();
            }, 500);
        });
    } else {
        setTimeout(() => {
            initProjectFilters();
            initMobileDropdown();
        }, 500);
    }

    // Also try to initialize when window loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (allProjectCards.length === 0) {
                console.log('🔄 Retrying filter initialization on window load');
                collectProjectCards();
                updateAllFilterCounts();
                applyFilter(currentFilter);
            }
        }, 1000);
    });

})();