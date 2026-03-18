/**
 * github-api.js - Fetch projects from GitHub API with proper categorization
 * @author Ian Tolentino
 * @version 5.0.0
 */

const GITHUB_USERNAME = 'iantolentino';
const GITHUB_API_BASE = 'https://api.github.com/users/' + GITHUB_USERNAME;

let cachedProjects = null;
let cachedStats = null;

/**
 * Categorize projects based on your specific rules
 */
function categorizeProject(repo) {
    const name = repo.name.toLowerCase();
    const description = (repo.description || '').toLowerCase();
    const language = repo.language || '';
    
    // Web Apps - HTML, CSS, JavaScript based projects
    if (language === 'HTML' || language === 'CSS' || 
        (language === 'JavaScript' && !name.includes('desktop') && !description.includes('desktop')) ||
        name.includes('web') || description.includes('web app') ||
        name.includes('dashboard') || name.includes('portfolio') ||
        name.includes('kanban') || name.includes('pomodoro') ||
        name.includes('budget') || name.includes('calculator') ||
        name.includes('flashcard') || name.includes('blog') ||
        name.includes('ephemeral') || name.includes('scoutify') ||
        name.includes('echothread') || name.includes('linkvault') ||
        name.includes('dev') || name.includes('email-template') ||
        name.includes('loan-calculator') || name.includes('sleep-cycle') ||
        name.includes('spaceremover') || name.includes('colordocx')) {
        return 'Web Apps';
    }
    
    // Python Projects (pure Python, no GUI)
    if (language === 'Python' && 
        !name.includes('gui') && !description.includes('gui') &&
        !name.includes('desktop') && !description.includes('desktop') &&
        !name.includes('tkinter') && !name.includes('pyqt') &&
        !name.includes('pyside') && !description.includes('automation') &&
        !name.includes('scraper') && !description.includes('scraper')) {
        return 'Python';
    }
    
    // Desktop Applications (Python with GUI)
    if ((language === 'Python' && (name.includes('gui') || description.includes('gui') ||
         name.includes('desktop') || description.includes('desktop') ||
         name.includes('tkinter') || name.includes('pyqt') || name.includes('pyside') ||
         name.includes('customtkinter'))) ||
        name.includes('tomodoro') || name.includes('pdf-toolkit') ||
        name.includes('expense-tracker') || name.includes('qr') && (name.includes('scanner') || name.includes('generator')) ||
        name.includes('inventory') || name.includes('salary') ||
        name.includes('password-vault') || name.includes('luminar') ||
        name.includes('task-alarm') || name.includes('home-maintenance') ||
        name.includes('disposal-form') || name.includes('qr-scanner') ||
        name.includes('qr-generator')) {
        return 'Desktop';
    }
    
    // Browser Extensions
    if (name.includes('extension') || description.includes('extension') ||
        name.includes('chrome') || description.includes('chrome extension') ||
        name.includes('darkmode') || name.includes('tab-manager') ||
        name.includes('motivational') || name.includes('pause-reminder') ||
        name.includes('email-rewriting') || name.includes('force-darkmode')) {
        return 'Extensions';
    }
    
    // Automation Tools
    if (name.includes('automation') || description.includes('automation') ||
        name.includes('monitor') || description.includes('monitoring') ||
        name.includes('radmin') || name.includes('bingauto') ||
        name.includes('ftp') || name.includes('scraper') ||
        name.includes('room-temp') || name.includes('website-uptime') ||
        name.includes('crypto-data') || description.includes('scraper')) {
        return 'Automation';
    }
    
    // Utilities
    if (name.includes('file') || description.includes('file') ||
        name.includes('organizer') || description.includes('organizer') ||
        name.includes('generator') || description.includes('generator') ||
        name.includes('converter') || description.includes('converter') ||
        name.includes('toolkit') || name.includes('cli') ||
        name.includes('print') || name.includes('manager') ||
        name.includes('portfolio-crafter') || name.includes('code-snippet') ||
        name.includes('github-repo-fetcher') || name.includes('resume-manager')) {
        return 'Utilities';
    }
    
    // Default fallback based on language
    if (language === 'Python') return 'Python';
    if (language === 'JavaScript' || language === 'TypeScript') return 'Web Apps';
    if (language === 'HTML' || language === 'CSS') return 'Web Apps';
    if (language === 'PHP') return 'Web Apps';
    
    return 'Utilities';
}

/**
 * Fallback projects in case API fails
 */
function getFallbackProjects() {
    return [
        {
            name: "Room Temperature Monitoring Tool",
            description: "Enterprise-grade application for server room monitoring",
            url: "https://github.com/iantolentino/Room-Temp-Monitoring-Tool",
            stars: 2,
            forks: 1,
            language: "Python",
            updated: "Mar 2024",
            category: "Automation",
            categoryClass: "automation"
        },
        {
            name: "Axon",
            description: "Comprehensive personal productivity application",
            url: "https://github.com/iantolentino/Axon",
            stars: 3,
            forks: 2,
            language: "JavaScript",
            updated: "Feb 2024",
            category: "Web Apps",
            categoryClass: "web-apps"
        },
        {
            name: "Password Vault",
            description: "Secure password manager with encryption",
            url: "https://github.com/iantolentino/Password-Vault",
            stars: 4,
            forks: 1,
            language: "Python",
            updated: "Jan 2024",
            category: "Desktop",
            categoryClass: "desktop"
        },
        {
            name: "QR Code Attendance Scanner",
            description: "Desktop app for QR code attendance tracking",
            url: "https://github.com/iantolentino/QRCode-Attendance-Scanner",
            stars: 4,
            forks: 2,
            language: "Python",
            updated: "Dec 2023",
            category: "Desktop",
            categoryClass: "desktop"
        },
        {
            name: "Daily Motivational Quotes",
            description: "Chrome extension for motivational quotes",
            url: "https://github.com/iantolentino/daily-motivational-quotes",
            stars: 3,
            forks: 0,
            language: "JavaScript",
            updated: "Sep 2023",
            category: "Extensions",
            categoryClass: "extensions"
        },
        {
            name: "File Organizer",
            description: "Command-line tool to organize files",
            url: "https://github.com/iantolentino/File-Organizer",
            stars: 5,
            forks: 3,
            language: "Python",
            updated: "Aug 2023",
            category: "Utilities",
            categoryClass: "utilities"
        },
        {
            name: "Ephemeral Chat",
            description: "Peer-to-peer chat using WebRTC",
            url: "https://github.com/iantolentino/Ephemeral",
            stars: 3,
            forks: 1,
            language: "JavaScript",
            updated: "Jul 2023",
            category: "Web Apps",
            categoryClass: "web-apps"
        },
        {
            name: "Generative UI Builder",
            description: "Natural language to UI converter",
            url: "https://github.com/iantolentino/generative-ui-builder",
            stars: 4,
            forks: 2,
            language: "JavaScript",
            updated: "Jun 2023",
            category: "Web Apps",
            categoryClass: "web-apps"
        }
    ];
}

/**
 * Fetch GitHub user stats
 */
async function fetchGitHubStats() {
    if (cachedStats) return cachedStats;
    
    try {
        console.log('📊 Fetching GitHub stats...');
        
        // Fetch user data
        const userResponse = await fetch(GITHUB_API_BASE);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        
        // Fetch repositories to calculate stars and forks
        const reposResponse = await fetch(`${GITHUB_API_BASE}/repos?per_page=100&sort=updated`);
        if (!reposResponse.ok) throw new Error('Failed to fetch repos');
        const reposData = await reposResponse.json();
        
        // Calculate total stars and forks
        let totalStars = 0;
        let totalForks = 0;
        let languages = new Set();
        
        reposData.forEach(repo => {
            totalStars += repo.stargazers_count || 0;
            totalForks += repo.forks_count || 0;
            if (repo.language) languages.add(repo.language);
        });
        
        // For contributions, we'll use a combination of public repos and a reasonable estimate
        const contributions = Math.max(reposData.length * 3, 50);
        
        cachedStats = {
            repos: userData.public_repos || reposData.length,
            stars: totalStars,
            forks: totalForks,
            languages: languages.size,
            contributions: contributions,
            followers: userData.followers || 0,
            following: userData.following || 0
        };
        
        console.log('✅ GitHub stats fetched:', cachedStats);
        return cachedStats;
        
    } catch (error) {
        console.error('❌ Error fetching GitHub stats:', error);
        return getFallbackStats();
    }
}

/**
 * Fallback stats in case API fails
 */
function getFallbackStats() {
    return {
        repos: 63,
        stars: 142,
        forks: 45,
        languages: 25,
        contributions: 189,
        followers: 12,
        following: 8
    };
}

/**
 * Update stats display on the page
 */
async function updateStatsDisplay() {
    console.log('📊 Updating stats display...');
    const stats = await fetchGitHubStats();
    
    // Update total projects
    const totalProjectsEl = document.getElementById('total-projects');
    if (totalProjectsEl) {
        totalProjectsEl.textContent = stats.repos;
        console.log('✅ Updated projects:', stats.repos);
    } else {
        console.warn('⚠️ total-projects element not found');
    }
    
    // Update total stars
    const totalStarsEl = document.getElementById('total-stars');
    if (totalStarsEl) {
        totalStarsEl.textContent = stats.stars;
        console.log('✅ Updated stars:', stats.stars);
    } else {
        console.warn('⚠️ total-stars element not found');
    }
    
    // Update total forks
    const totalForksEl = document.getElementById('total-forks');
    if (totalForksEl) {
        totalForksEl.textContent = stats.forks;
        console.log('✅ Updated forks:', stats.forks);
    } else {
        console.warn('⚠️ total-forks element not found');
    }
    
    // Update total contributions
    const totalContributionsEl = document.getElementById('total-contributions');
    if (totalContributionsEl) {
        totalContributionsEl.textContent = stats.contributions;
        console.log('✅ Updated contributions:', stats.contributions);
    } else {
        console.warn('⚠️ total-contributions element not found');
    }
    
    console.log('📊 Stats display updated');
}

/**
 * Fetch all repositories from GitHub with retry logic
 */
async function fetchGitHubProjects() {
    if (cachedProjects) return cachedProjects;
    
    try {
        console.log('Fetching projects from GitHub...');
        let allRepos = [];
        let page = 1;
        let hasMore = true;
        let retryCount = 0;
        const maxRetries = 3;
        
        while (hasMore && page <= 10) { // Increased to 10 pages max
            try {
                const response = await fetch(`${GITHUB_API_BASE}/repos?sort=updated&per_page=100&page=${page}`);
                
                if (response.status === 403) {
                    // Rate limited
                    console.warn('⚠️ GitHub API rate limit reached, using fallback');
                    return getFallbackProjects();
                }
                
                if (!response.ok) {
                    throw new Error(`GitHub API error: ${response.status}`);
                }
                
                const repos = await response.json();
                
                if (repos.length === 0) {
                    hasMore = false;
                } else {
                    allRepos = allRepos.concat(repos);
                    console.log(`📦 Fetched page ${page}: ${repos.length} repos (total: ${allRepos.length})`);
                    page++;
                    retryCount = 0; // Reset retry count on success
                }
            } catch (pageError) {
                console.error(`❌ Error fetching page ${page}:`, pageError);
                retryCount++;
                
                if (retryCount >= maxRetries) {
                    console.warn('⚠️ Max retries reached, stopping pagination');
                    hasMore = false;
                } else {
                    // Wait before retrying
                    await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
                }
            }
        }
        
        if (allRepos.length === 0) {
            console.warn('⚠️ No repos fetched, using fallback');
            return getFallbackProjects();
        }
        
        console.log(`✅ Fetched ${allRepos.length} total projects from GitHub`);
        
        // Process and categorize projects
        cachedProjects = allRepos.map(repo => {
            const category = categorizeProject(repo);
            let categoryClass = '';
            switch(category) {
                case 'Web Apps': categoryClass = 'web-apps'; break;
                case 'Python': categoryClass = 'python'; break;
                case 'Desktop': categoryClass = 'desktop'; break;
                case 'Extensions': categoryClass = 'extensions'; break;
                case 'Automation': categoryClass = 'automation'; break;
                case 'Utilities': categoryClass = 'utilities'; break;
                default: categoryClass = 'utilities';
            }
            
            return {
                name: repo.name,
                description: repo.description || 'No description available',
                url: repo.html_url,
                stars: repo.stargazers_count || 0,
                forks: repo.forks_count || 0,
                language: repo.language || 'Other',
                updated: new Date(repo.updated_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                }),
                category: category,
                categoryClass: categoryClass
            };
        });
        
        // Log category counts for debugging
        const counts = {};
        cachedProjects.forEach(p => {
            counts[p.categoryClass] = (counts[p.categoryClass] || 0) + 1;
        });
        console.log('📊 Category counts:', counts);
        
        return cachedProjects;
    } catch (error) {
        console.error('❌ GitHub API error:', error);
        return getFallbackProjects();
    }
}

/**
 * Render projects in the specified container
 */
async function renderProjects(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container #${containerId} not found`);
        return;
    }
    
    // Show loading state
    container.innerHTML = `
        <div class="loading-projects">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading projects from GitHub...</p>
        </div>
    `;
    
    // Fetch projects and stats
    const projects = await fetchGitHubProjects();
    const stats = await fetchGitHubStats();
    
    // Update stats display
    await updateStatsDisplay();
    
    if (!projects || projects.length === 0) {
        container.innerHTML = `
            <div class="no-projects">
                <i class="fas fa-exclamation-circle"></i>
                <p>Failed to load projects. Please try again later.</p>
            </div>
        `;
        return;
    }
    
    console.log(`🎨 Rendering ${projects.length} projects`);
    
    // Render all projects
    renderProjectCards(container, projects);
    
    // Dispatch event that projects are loaded
    setTimeout(() => {
        const event = new CustomEvent('projectsLoaded', { 
            detail: { projects: projects, stats: stats } 
        });
        window.dispatchEvent(event);
    }, 100);
    
    return projects;
}

/**
 * Render project cards in container
 */
function renderProjectCards(container, projects) {
    container.innerHTML = projects.map(p => `
        <div class="card project-card" 
             data-category="${p.categoryClass}" 
             data-category-name="${p.category}"
             data-url="${p.url}"
             data-language="${p.language}"
             data-stars="${p.stars}"
             data-forks="${p.forks || 0}">
            <div class="card-header">
                <h3 title="${p.name}">${p.name}</h3>
                <div class="tech-stack">
                    <span class="tech-tag">${p.language}</span>
                    <span class="category-badge category-${p.categoryClass}">${p.category}</span>
                </div>
            </div>
            <p class="project-description" title="${p.description}">${p.description.substring(0, 120)}${p.description.length > 120 ? '...' : ''}</p>
            <div class="card-footer">
                <span class="project-type">
                    <i class="far fa-calendar-alt"></i> ${p.updated}
                </span>
                <div class="project-metrics">
                    <span class="project-stars" title="Stars">
                        <i class="fas fa-star"></i> ${p.stars}
                    </span>
                    <span class="project-forks" title="Forks">
                        <i class="fas fa-code-branch"></i> ${p.forks || 0}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
    
    console.log(`✅ Rendered ${projects.length} project cards`);
}

// Export functions
window.fetchGitHubProjects = fetchGitHubProjects;
window.fetchGitHubStats = fetchGitHubStats;
window.updateStatsDisplay = updateStatsDisplay;
window.renderProjects = renderProjects;
window.categorizeProject = categorizeProject;